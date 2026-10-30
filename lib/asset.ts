const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixa caminhos de /public com o basePath (necessário no GitHub Pages). */
export function asset(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${base}${path}`;
}
