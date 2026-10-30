"use client";

import { LazyMotion } from "motion/react";

// As features de animação do Motion chegam num chunk separado, depois do primeiro paint.
const loadFeatures = () => import("./features").then((m) => m.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
