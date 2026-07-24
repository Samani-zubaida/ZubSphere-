import { motion } from "framer-motion";
import { ReactNode, Ref } from "react";
import { useDirection } from "../../Context/DirectionContext";

interface PageTransitionProps {
  children: ReactNode;
  // Optional: lets a page (currently only HomePage) get a live ref to
  // this wrapper's own scrollable DOM node. HomePage needs it to run
  // useScroll() against the exact element the user is actually
  // scrolling, so the flying portrait's position can be driven by real
  // scroll progress instead of a fixed-duration animation.
  scrollRef?: Ref<HTMLDivElement>;
}

// The one-scroll route transition. Deliberately transform + opacity
// ONLY — no `filter: blur()`. Blurring a full-viewport fixed layer is
// what caused the whole screen to flash white for a frame (animating
// filter forces the browser to repaint the layer against the page
// behind it, and that page's default background is white). Scale
// never dips below 1 for the same reason: shrinking a fixed inset-0
// element below 100% exposes whatever sits behind it at the edges.
// Both pages are always >= 100% size, and the fallback black lives on
// <body> now (see index.css) instead of on this wrapper — see the note
// below on why — so there's nothing behind them left to reveal.
//
// This wrapper is deliberately NOT opaque anymore. It used to carry
// its own bg-[#0a0a0a], which — because it's the direct parent of every
// page's content — made it impossible for FlyingPortrait to sit behind
// a page's text: an opaque parent paints as one solid unit, so
// "background behind the image, text in front of it" can't happen
// within it. Removing the opaque paint here and giving this wrapper an
// explicit z-index ABOVE FlyingPortrait (see App.tsx / FlyingPortrait.tsx
// for the full stack: body black < FlyingPortrait < this) means: body's
// black shows through any empty space, FlyingPortrait shows through
// wherever a page doesn't paint over it, and a page's own opaque
// content (like Hero's headline, or Projects/Contact's own
// bg-[#0a0a0a] sections) still fully covers it exactly where intended.
//
// Forward scroll (direction >= 0): new page rises up from below,
// old page slides up and out the top.
// Backward scroll (direction < 0): mirrored.
const variants = {
  enter: (dir: number) => ({
    y: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    y: "0%",
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    y: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 1.03,
  }),
};

const TRANSITION = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Each page's outer wrapper. `fixed inset-0` makes every page occupy
 * exactly the same full-screen layer, so the slide reads as "content
 * replacing content in place" rather than "a new document loaded" —
 * that's the key to the single-page illusion.
 *
 * `data-route-scroll` is read by useScrollNavigation to decide whether
 * a gesture should scroll this page's own content or trigger the next
 * route — it's what keeps mobile scrolling safe when a page's content
 * is taller than the viewport.
 */
const PageTransition = ({ children, scrollRef }: PageTransitionProps) => {
  const direction = useDirection();

  return (
    <motion.div
      ref={scrollRef}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={TRANSITION}
      data-route-scroll
      className="no-scrollbar fixed inset-0 z-20 w-full h-[100dvh] overflow-y-auto overscroll-none"
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
