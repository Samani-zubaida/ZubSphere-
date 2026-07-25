import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/#profile" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) => {
    const [path, hash] = to.split("#");
    return (
      location.pathname === (path || "/") &&
      (hash ? location.hash === `#${hash}` : !location.hash)
    );
  };

  return (
    <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50">
      {/* ── Main capsule ── */}
      <nav
        className="flex items-center bg-black/50 backdrop-blur-xl text-white rounded-full border border-white/[0.08] shadow-lg shadow-black/20"
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center pl-1.5 pr-0.5 py-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition ${
                isActive(item.to)
                  ? "bg-[#00D4FF] text-black"
                  : "text-white/60 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop divider */}
        <div className="hidden sm:block w-px h-4 bg-white/10 mx-1" />

        {/* Resume (all screens) */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-white/50 hover:text-white hover:bg-white/[0.08] transition text-[11px] sm:text-[13px] font-medium whitespace-nowrap"
        >
          <FileText size={13} />
          <span className="hidden sm:inline">Resume</span>
        </a>

        {/* Mobile: Nav dropdown trigger (no hamburger) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden flex items-center gap-0.5 px-2.5 py-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/[0.08] transition text-[11px] font-medium"
        >
          Nav
          <motion.span
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={12} />
          </motion.span>
        </button>

        {/* Divider */}
        <div className="w-px h-3.5 bg-white/10 mx-0.5" />

        {/* Ask AI */}
        <Link
          to="/chat"
          className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white text-black text-[11px] sm:text-[13px] font-semibold whitespace-nowrap transition hover:bg-white/90 mr-0.5"
        >
          Ask AI
        </Link>
      </nav>

      {/* ── Mobile dropdown (words fall from above) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="show"
            exit="exit"
            className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-1.5 py-1.5 min-w-[140px] shadow-xl shadow-black/30 overflow-hidden"
          >
            {navItems.map((item) => (
              <motion.div key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2 rounded-xl text-[11px] font-medium transition ${
                    isActive(item.to)
                      ? "bg-[#00D4FF]/10 text-[#00D4FF]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;