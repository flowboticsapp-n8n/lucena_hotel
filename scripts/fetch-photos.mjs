// Baixa as fotos do Unsplash listadas em scripts/photos.json para public/photos/auto,
// em AVIF, WebP e JPEG (o Unsplash converte no servidor dele — sem dependência local).
// - Valida o tipo real de cada arquivo; formato que falhar fica de fora do manifesto.
// - Grava content/photos.manifest.json (formatos e larguras disponíveis por foto),
//   lido por content/hotel.ts — o HTML nunca aponta para arquivo inexistente.
// - Pula fotos já baixadas (rode com --force para rebaixar).
// - Sem internet: usa scripts/placeholder.jpg (só JPEG) e avisa.
// - Com STRICT_PHOTOS=1, falha o build se alguma foto não for baixada.
import { mkdir, writeFile, copyFile, access, readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.join(root, "..", "public", "photos", "auto");
const manifestPath = path.join(root, "..", "content", "photos.manifest.json");
const placeholder = path.join(root, "placeholder.jpg");
const { photos, formats } = JSON.parse(readFileSync(path.join(root, "photos.json"), "utf8"));
const force = process.argv.includes("--force");

const MIME = { avif: "image/avif", webp: "image/webp", jpg: "image/jpeg" };
const exists = (p) => access(p).then(() => true, () => false);
const fileFor = (name, w, fmt) => path.join(outDir, `${name}-${w}.${fmt}`);

async function download(id, width, fmt, quality) {
  const url = `https://images.unsplash.com/photo-${id}?fm=${fmt}&q=${quality}&fit=crop&w=${width}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || type !== MIME[fmt]) throw new Error(`${res.status} ${type}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error("arquivo pequeno demais");
  return buf;
}

await mkdir(outDir, { recursive: true });
const old = await readFile(manifestPath, "utf8").then(JSON.parse, () => ({}));
const manifest = {};
const missing = [];

for (const [name, { widths, ids, quality = 70 }] of Object.entries(photos)) {
  const prev = old[name];
  const cached =
    !force &&
    prev &&
    JSON.stringify(prev.widths) === JSON.stringify(widths) &&
    (await Promise.all(prev.formats.flatMap((f) => widths.map((w) => exists(fileFor(name, w, f)))))).every(Boolean);
  if (cached) {
    manifest[name] = prev;
    continue;
  }

  let done = false;
  for (const id of ids) {
    try {
      // JPEG é obrigatório (fallback universal); AVIF/WebP são bônus.
      const jpgs = await Promise.all(widths.map((w) => download(id, w, "jpg", quality)));
      await Promise.all(jpgs.map((b, i) => writeFile(fileFor(name, widths[i], "jpg"), b)));
      const ok = ["jpg"];
      for (const fmt of formats.filter((f) => f !== "jpg")) {
        try {
          const bufs = await Promise.all(widths.map((w) => download(id, w, fmt, quality)));
          await Promise.all(bufs.map((b, i) => writeFile(fileFor(name, widths[i], fmt), b)));
          ok.unshift(fmt);
        } catch (err) {
          console.warn(`  ${name}: ${fmt} indisponível (${err.message ?? err})`);
        }
      }
      manifest[name] = { widths, formats: formats.filter((f) => ok.includes(f)) };
      console.log(`✓ ${name} ← ${id} [${manifest[name].formats.join(", ")}]`);
      done = true;
      break;
    } catch (err) {
      console.warn(`  ${name}: ${id} falhou (${err.message ?? err})`);
    }
  }
  if (!done) {
    missing.push(name);
    await Promise.all(widths.map((w) => copyFile(placeholder, fileFor(name, w, "jpg"))));
    manifest[name] = { widths, formats: ["jpg"] };
    console.warn(`! ${name}: usando placeholder`);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

if (missing.length) {
  const msg = `Fotos sem download (usando placeholder): ${missing.join(", ")}`;
  // No GitHub Actions vira um aviso visível no resumo do workflow
  console.warn(process.env.GITHUB_ACTIONS ? `::warning::${msg}` : `\n${msg}`);
  if (process.env.STRICT_PHOTOS === "1") process.exit(1);
}
