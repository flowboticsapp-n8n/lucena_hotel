"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Lenis na raiz; com prefers-reduced-motion a roda do mouse volta a ser nativa. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: !reduce,
        anchors: { offset: -72 },
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
