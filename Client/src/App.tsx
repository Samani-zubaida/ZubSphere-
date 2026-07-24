import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup } from "framer-motion";
import { useScrollNavigation } from "./hooks/useScrollNavigation";
import { DirectionProvider } from "./Context/DirectionContext";
import Navbar from "./components/layouts/Navbar";
import FlyingPortrait from "./shared/FlyingPortrait";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import Chatbot from "./components/chatbot/Chatbot";

const App = () => {
  const location = useLocation();
  const direction = useScrollNavigation();

  return (
    <LayoutGroup>
      {/* Rendered ONCE, entirely outside the route tree. This is what
          makes it genuinely persistent — it never unmounts, never
          re-renders on navigation, never flickers. A real single-page
          app's nav behaves exactly this way; this is what was missing
          before (it was being remounted fresh inside every page). */}
      <Navbar />

      {/* custom={direction} on AnimatePresence is what lets the
          EXITING page's animation still receive the fresh direction
          value at the moment of transition, not a stale one captured
          when that page originally mounted. FlyingPortrait also reads
          direction (for its flip), so it has to live inside this
          provider too — outside of it, useDirection() would only ever
          see the default value. */}
      <DirectionProvider value={direction}>
        {/* Same reasoning as Navbar above: living here means it's never
            nested inside PageTransition's animating/clipping wrapper,
            so its own flight animation is never fought by the
            page-slide transform. See FlyingPortrait.tsx for the full
            explanation. */}
        <FlyingPortrait />

        <AnimatePresence custom={direction} initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            {/* Profile is now a section of Home (see HomePage.tsx),
                scrolled to natively instead of routed to. This keeps
                any old /profile links or bookmarks working. */}
            <Route path="/profile" element={<Navigate to="/#profile" replace />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </AnimatePresence>
      </DirectionProvider>
    </LayoutGroup>
  );
};

export default App;