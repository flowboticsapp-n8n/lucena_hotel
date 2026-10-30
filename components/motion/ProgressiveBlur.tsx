/**
 * Desfoque progressivo: 8 camadas com backdrop-filter (0.25px dobrando até 30px),
 * cada uma visível numa faixa de 12.5% via mask-image. Juntas formam uma rampa suave.
 */
const BLURS = [0.25, 0.5, 1, 2, 4, 8, 16, 30];

export function ProgressiveBlur({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      {BLURS.map((blur, i) => {
        const s = i * 12.5;
        const mask = `linear-gradient(to bottom, transparent ${s}%, black ${s + 12.5}%, black ${s + 25}%, transparent ${s + 37.5}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              zIndex: i + 1,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage:
                i === BLURS.length - 1
                  ? `linear-gradient(to bottom, transparent ${s}%, black ${s + 12.5}%)`
                  : mask,
              WebkitMaskImage:
                i === BLURS.length - 1
                  ? `linear-gradient(to bottom, transparent ${s}%, black ${s + 12.5}%)`
                  : mask,
            }}
          />
        );
      })}
    </div>
  );
}
