"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

/** Aparece ao entrar na tela (y:20→0, opacity 0→1), uma vez só. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </m.div>
  );
}
