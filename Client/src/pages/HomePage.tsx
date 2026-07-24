import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useMotionValueEvent } from "framer-motion";
import PageTransition from "../components/layouts/PageTransition";
import PageShell from "../components/layouts/PageShell";
import Hero from "../components/Hero";
import Profile from "../components/Profile";
import { heroScrollProgress } from "../Context/ScrollProgressContext";
import { useDirection } from "../Context/DirectionContext";

/**
 * Hero and Profile now live on the SAME route, stacked in normal
 * document flow, scrolled with the browser's real native scrolling —
 * not two separate routes stitched together with a fixed-duration
 * "flight" animation. That's what makes the portrait genuinely track
 * the scroll position pixel-by-pixel instead of jumping between two
 * fixed poses.
 *
 * `useScroll({ container, target })` measures progress specifically
 * as `heroRef`'s own section scrolls past the top of the viewport:
 * 0 = Hero section fully in view, 1 = Hero has scrolled completely
 * out (Profile now fills the screen).
 *
 * That LOCAL progress value then gets pushed into the shared
 * `heroScrollProgress` motion value (see ScrollProgressContext.tsx)
 * via the useMotionValueEvent below, every time it changes — which is
 * what FlyingPortrait actually reads. This two-step is necessary
 * because useScroll's result only exists while HomePage is mounted,
 * but FlyingPortrait (in App.tsx) needs a stable reference to read
 * from regardless of which page is currently active.
 */
const HomePage = () => {
  const location = useLocation();
  const direction = useDirection();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Pushes every live update from the local scrollYProgress into the
  // shared value FlyingPortrait reads. This is the fix: previously
  // this value was handed down via React Context, but FlyingPortrait
  // lives in App.tsx as a SIBLING of the route tree, not a descendant
  // of HomePage — so Context never reached it and it always saw a
  // frozen 0. A plain shared MotionValue reference sidesteps the
  // React tree entirely.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    heroScrollProgress.set(latest);
  });

  // Two entry behaviors, both matching how the old route-based version
  // felt:
  //  1. Arriving with location.hash === "#profile" (the "Profile" nav
  //     link, or an old /profile bookmark redirected here) scrolls to
  //     the Profile section — instantly on first mount, smoothly if
  //     the link is clicked again while already on Home.
  //  2. Arriving by scrolling BACKWARD from Projects (direction === -1)
  //     lands at the bottom of Profile, so scrolling up from Projects
  //     feels continuous instead of dumping you back at the very top
  //     of Hero.
  const hasHandledInitialEntry = useRef(false);
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (location.hash === "#profile" && profileRef.current) {
      profileRef.current.scrollIntoView({
        behavior: hasHandledInitialEntry.current ? "smooth" : "auto",
        block: "start",
      });
    } else if (!hasHandledInitialEntry.current && direction < 0) {
      container.scrollTop = container.scrollHeight;
    }

    hasHandledInitialEntry.current = true;
  }, [location.hash, direction]);

  return (
    <PageTransition scrollRef={scrollContainerRef}>
      <PageShell>
        <div ref={heroRef} className="relative">
          <Hero />
        </div>
        <div ref={profileRef} id="profile">
          <Profile />
        </div>
      </PageShell>
    </PageTransition>
  );
};

export default HomePage;