import type { Photo } from "@/content/hotel";
import { Img } from "@/components/ui/Img";

/**
 * Desfoque progressivo na metade de baixo do hero.
 *
 * Versão original: 8 camadas com `backdrop-filter` — o navegador re-desfoca o fundo
 * a cada quadro, e num PC fraco isso travava carregamento e rolagem (medido: p95 de
 * 134ms por quadro na rolagem com CPU 4x mais lenta; sem ele, 17ms).
 *
 * Esta versão desenha cópias da própria foto com `filter: blur` — calculado uma vez e
 * guardado como textura — cada uma mascarada numa faixa. Mesmo efeito visual, porque
 * atrás do desfoque só existe a foto. As cópias usam o mesmo srcSet/sizes da foto
 * principal, então reaproveitam o download.
 */
const LAYERS = [
  { blur: 1, from: 0 },
  { blur: 3, from: 20 },
  { blur: 8, from: 40 },
  { blur: 18, from: 60 },
  { blur: 30, from: 78 },
];

export function ProgressiveBlur({
  photo,
  className = "",
}: {
  photo: Photo;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {LAYERS.map(({ blur, from }) => {
        const mask = `linear-gradient(to bottom, transparent ${from}%, black ${Math.min(from + 22, 100)}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{ maskImage: mask, WebkitMaskImage: mask }}
          >
            {/* foto com a altura do hero inteiro, alinhada pela base (mesmo enquadramento
                da principal); a franja do desfoque na borda fica sob o véu azul */}
            <Img
              photo={photo}
              alt=""
              loading="eager"
              className="absolute inset-x-0 bottom-0 h-[200%] w-full object-cover"
              style={{ filter: `blur(${blur}px)` }}
            />
          </div>
        );
      })}
    </div>
  );
}
