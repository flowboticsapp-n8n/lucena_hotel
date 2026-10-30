/** Linha preta de 2px que cresce na base do card no hover (o card precisa de `group relative`). */
export function HoverLine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] origin-left scale-x-0 bg-gold-dark transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  );
}
