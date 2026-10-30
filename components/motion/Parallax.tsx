"use client";

import { useLayoutEffect, useRef } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import { useMedia } from "./useMedia";

/**
 * Parallax na imagem: translateY de -40px a +100px enquanto o alvo cruza a tela.
 * A imagem é 140px mais alta que o container para nunca mostrar borda.
 * `trackSection`: mede a <section> ancestral (usado nas fotos sticky,
 * cujo próprio retângulo fica parado enquanto grudam no topo).
 */
export function Parallax({
  children,
  className = "",
  trackSection = false,
}: {
  children: React.ReactNode;
  className?: string;
  trackSection?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    target.current = trackSection
      ? (ref.current?.closest("section") ?? ref.current)
      : ref.current;
  }, [trackSection]);

  const reduce = useReducedMotion();
  const mobile = useMedia("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const range = reduce ? [0, 0] : mobile ? [-15, 40] : [-40, 100];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <m.div
        style={{ y }}
        className="absolute inset-x-0 -top-[100px] h-[calc(100%+140px)] will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
}
