import type { TargetAndTransition, Variants } from "framer-motion";

const ARC_STEPS = 24;

/**
 * Samples a smooth quarter-circle arc across ARC_STEPS points, producing
 * keyframe arrays for x/y/rotate/scale/opacity. `dir` mirrors the curve
 * for forward vs backward navigation; `mode` picks whether we're
 * animating a card arriving ("enter") or leaving ("exit").
 *
 * Typed as Framer Motion's own `TargetAndTransition` (not a custom
 * interface) so it's directly assignable to a `variants` prop without
 * a structural-typing mismatch.
 */
export function buildArc(
  dir: 1 | -1,
  mode: "enter" | "exit"
): TargetAndTransition {
  const x: number[] = [];
  const y: number[] = [];
  const rotate: number[] = [];
  const scale: number[] = [];
  const opacity: number[] = [];

  for (let i = 0; i <= ARC_STEPS; i++) {
    const t = i / ARC_STEPS;
    const p = mode === "enter" ? 1 - t : t;

    const angle = p * (Math.PI / 2);
    const arcX = Math.sin(angle) * 360 * dir * (mode === "enter" ? 1 : -1);
    const arcY = (1 - Math.cos(angle)) * 90;

    x.push(arcX);
    y.push(-arcY);
    rotate.push(dir * p * 10 * (mode === "enter" ? 1 : -1));
    scale.push(1 - p * 0.25);
    opacity.push(1 - p);
  }

  return { x, y, rotate, scale, opacity };
}

export const arcVariants: Variants = {
  enter: (dir: 1 | -1) => buildArc(dir, "enter"),
  exit: (dir: 1 | -1) => buildArc(dir, "exit"),
};

export const ARC_TRANSITION = {
  duration: 2.6,
  ease: [0.45, 0, 0.2, 1] as const,
};