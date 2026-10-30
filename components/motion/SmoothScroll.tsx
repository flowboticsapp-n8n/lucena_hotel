"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/** Com prefers-reduced-motion, a rolagem volta a ser nativa. */
function ReducedMotionGuard() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (lenis) lenis.options.smoothWheel = !reduce;
  }, [lenis, reduce]);
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -72 }, autoRaf: true }}>
      <ReducedMotionGuard />
      {children}
    </ReactLenis>
  );
}
