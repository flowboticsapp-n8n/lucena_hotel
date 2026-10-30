// Baixa as fotos do Unsplash listadas em scripts/photos.json para public/photos/auto.
// - Pula arquivos que já existem (rode com --force para rebaixar).
// - Se nenhum ID responder (ex.: sem internet), usa scripts/placeholder.jpg e avisa.
// - Com STRICT_PHOTOS=1, falha o build se alguma foto não for baixada.
import { mkdir, writeFile, copyFile, access } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const outDir = path.join(root, "..", "public", "photos", "auto");
const placeholder = path.join(root, "placeholder.jpg");
const { photos } = JSON.parse(readFileSync(path.join(root, "photos.json"), "utf8"));
const force = process.argv.includes("--force");

const exists = (p) => access(p).then(() => true, () => false);

async function download(id, width) {
  const url = `https://images.unsplash.com/photo-${id}?fm=jpg&q=70&fit=crop&w=${width}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status} ${type}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error("arquivo pequeno demais");
  return buf;
}

await mkdir(outDir, { recursive: true });
const missing = [];

for (const [name, { widths, ids }] of Object.entries(photos)) {
  const files = widths.map((w) => path.join(outDir, `${name}-${w}.jpg`));
  if (!force && (await Promise.all(files.map(exists))).every(Boolean)) continue;

  let done = false;
  for (const id of ids) {
    try {
      const bufs = await Promise.all(widths.map((w) => download(id, w)));
      await Promise.all(bufs.map((b, i) => writeFile(files[i], b)));
      console.log(`✓ ${name} ← ${id}`);
      done = true;
      break;
    } catch (err) {
      console.warn(`  ${name}: ${id} falhou (${err.message ?? err})`);
    }
  }
  if (!done) {
    missing.push(name);
    await Promise.all(files.map((f) => copyFile(placeholder, f)));
    console.warn(`! ${name}: usando placeholder`);
  }
}

if (missing.length) {
  console.warn(`\nFotos sem download: ${missing.join(", ")}`);
  if (process.env.STRICT_PHOTOS === "1") process.exit(1);
}
