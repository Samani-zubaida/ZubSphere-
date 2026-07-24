import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ROUTE_ORDER = ["/", "/projects", "/contact"];

// Kept slightly longer than PageTransition's 0.85s animation so a new
// gesture can never interrupt a flight already in progress (that's
// what caused the old "janky" double-trigger feeling).
const COOLDOWN_MS = 950;
const WHEEL_THRESHOLD = 35;
const SWIPE_THRESHOLD = 55; // px — mobile swipes are shorter than a full drag
const EDGE_TOLERANCE = 4; // px — treat "basically at the edge" as the edge

/**
 * The page that's actually on screen right now renders itself with
 * `data-route-scroll` (see PageTransition.tsx). We read its scroll
 * position live, on every gesture, instead of caching a ref — this is
 * what lets a single listener work correctly across route changes
 * without re-binding.
 */
function getScrollContainer(): HTMLElement | null {
  return document.querySelector("[data-route-scroll]");
}

function isAtTop(el: HTMLElement | null) {
  if (!el) return true;
  return el.scrollTop <= EDGE_TOLERANCE;
}

function isAtBottom(el: HTMLElement | null) {
  if (!el) return true;
  return el.scrollTop + el.clientHeight >= el.scrollHeight - EDGE_TOLERANCE;
}

/**
 * Listens for wheel + touch gestures and navigates forward/backward
 * through ROUTE_ORDER based on gesture direction. Returns the CURRENT
 * direction (1 = forward/down, -1 = backward/up) so the caller can
 * feed it into AnimatePresence's `custom` prop — that's what lets the
 * transition know which way to animate.
 *
 * Boundary-aware: if the active page's content is taller than the
 * viewport (common on small phones), a scroll/swipe first scrolls
 * that content normally. Only once the user hits the top or bottom
 * edge does the next gesture trigger a route change — so nothing
 * inside a page ever gets clipped on mobile.
 */
export function useScrollNavigation(): number {
  const location = useLocation();
  const navigate = useNavigate();
  const isLocked = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const currentIndex = ROUTE_ORDER.indexOf(location.pathname);
    if (currentIndex === -1) return;

    const tryNavigate = (dir: number) => {
      if (isLocked.current) return;

      const nextIndex = currentIndex + dir;
      if (nextIndex < 0 || nextIndex >= ROUTE_ORDER.length) return;

      const container = getScrollContainer();
      if (dir > 0 && !isAtBottom(container)) return;
      if (dir < 0 && !isAtTop(container)) return;

      setDirection(dir);
      isLocked.current = true;
      navigate(ROUTE_ORDER[nextIndex]);

      window.setTimeout(() => {
        isLocked.current = false;
      }, COOLDOWN_MS);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return;
      tryNavigate(e.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
      const deltaY = touchStartY.current - endY;
      touchStartY.current = null;

      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      tryNavigate(deltaY > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [location.pathname, navigate]);

  return direction;
}
