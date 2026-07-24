import { motionValue, MotionValue } from "framer-motion";

// Carries the live scroll progress (0 → 1) of the Hero→Profile section
// on the Home page, from where it's measured (HomePage.tsx) to
// FlyingPortrait, which renders outside the route tree entirely.
//
// This used to be a React Context — that was the actual bug. Context
// only flows DOWN to descendants, and FlyingPortrait is rendered in
// App.tsx as a SIBLING of <Routes> (see App.tsx), not a child of
// HomePage. So the value HomePage provided never reached it; it was
// always reading the static default, frozen at 0 — which is exactly
// why nothing was moving, resizing, or flipping.
//
// A MotionValue doesn't need to travel through the component tree —
// it's just a plain mutable object, so both files can hold a
// reference to the SAME one directly. HomePage pushes live scroll
// numbers into it (see the effect in HomePage.tsx); FlyingPortrait
// reads it straight from this import. No provider needed.
export const heroScrollProgress: MotionValue<number> = motionValue(0);