"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

let instance: Lenis | null = null;
/** Instância ativa (só existe em desktop com mouse/trackpad). */
export const getLenis = () => instance;

/**
 * Rolagem suave (Lenis) só onde faz diferença: mouse/trackpad e sem prefers-reduced-motion.
 * No toque o Lenis não suaviza nada, mas manteria um loop rodando a cada quadro —
 * por isso nem é baixado no celular (import dinâmico, chunk separado).
 */
export function SmoothScroll() {
  useEffect(() => {
    const ok = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!ok.matches) return;
    let cancelled = false;
    import("lenis").then(({ default: LenisClass }) => {
      if (cancelled) return;
      instance = new LenisClass({
        lerp: 0.1,
        anchors: { offset: -72 },
        autoRaf: true,
      });
    });
    return () => {
      cancelled = true;
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
