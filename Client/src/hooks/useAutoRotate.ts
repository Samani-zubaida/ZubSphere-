import { useEffect, useState, useCallback } from "react";
 
interface UseAutoRotateOptions {
  length: number;
  intervalMs?: number;
}
 
interface UseAutoRotateReturn {
  index: number;
  direction: 1 | -1;
  isPlaying: boolean;
  isHovering: boolean;
  goNext: () => void;
  goPrev: () => void;
  goTo: (i: number) => void;
  setIsHovering: (v: boolean) => void;
  togglePlay: () => void;
}
 
/**
 * Drives a rotating carousel: advances `index` automatically every
 * `intervalMs`, tracks which `direction` the last move was in (so the
 * component can animate consistently), and pauses whenever the user
 * hovers the section OR clicks pause — either condition alone stops it.
 */
export function useAutoRotate({
  length,
  intervalMs = 7000,
}: UseAutoRotateOptions): UseAutoRotateReturn {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
 
  const goNext = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % length);
  }, [length]);
 
  const goPrev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + length) % length);
  }, [length]);
 
  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );
 
  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
 
  const isRunning = isPlaying && !isHovering;
 
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(goNext, intervalMs);
    return () => clearInterval(timer);
  }, [isRunning, intervalMs, goNext]);
 
  return {
    index,
    direction,
    isPlaying,
    isHovering,
    goNext,
    goPrev,
    goTo,
    setIsHovering,
    togglePlay,
  };
}