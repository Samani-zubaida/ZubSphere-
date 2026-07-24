import { useAnimationFrame, useMotionValue, MotionValue } from "framer-motion";

/**
 * Returns a MotionValue that increments forever at `degreesPerSecond`,
 * wrapping every 360°'s worth internally is NOT needed here — consumers
 * (like OrbitIcon) apply `% 360` themselves when deriving an angle, since
 * different consumers may want the raw accumulating value for other math.
 */
export function useOrbitRotation(degreesPerSecond: number): MotionValue<number> {
  const rotation = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    rotation.set(rotation.get() + (degreesPerSecond * delta) / 1000);
  });

  return rotation;
}