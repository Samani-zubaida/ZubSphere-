import type { PanInfo } from "framer-motion";

export const DRAG_DISTANCE_THRESHOLD = 90;
export const DRAG_VELOCITY_THRESHOLD = 500;

/**
 * Returns -1 (drag went right → go to previous), 1 (drag went left →
 * go to next), or 0 (didn't clear either threshold, ignore the drag).
 */
export function getSwipeDirection(info: PanInfo): -1 | 0 | 1 {
  const { offset, velocity } = info;
  const swipedFarEnough = Math.abs(offset.x) > DRAG_DISTANCE_THRESHOLD;
  const flickedFastEnough = Math.abs(velocity.x) > DRAG_VELOCITY_THRESHOLD;

  if (!swipedFarEnough && !flickedFastEnough) return 0;
  return offset.x < 0 ? 1 : -1;
}