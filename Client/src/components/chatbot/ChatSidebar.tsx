import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../../data/navLinks";

const ChatSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ---- Mobile: hamburger button ---- */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md"
        aria-label="Open menu"
      >
        <FiMenu size={18} />
      </button>

      {/* ---- Desktop sidebar ---- */}
      <aside className="hidden md:flex flex-col w-60 flex-shrink-0 bg-black/40 border-r border-white/10 h-full p-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[#00D4FF] flex items-center justify-center text-black font-black">
            Z
          </div>
          <span className="text-white font-bold text-lg">ZubSphere</span>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/"
          className="mt-auto flex items-center gap-2 text-white/50 hover:text-white text-sm transition"
        >
          ↗ Visit site
        </Link>
      </aside>

      {/* ---- Mobile drawer + backdrop ---- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-white/10 z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#00D4FF] flex items-center justify-center text-black font-black">
                    Z
                  </div>
                  <span className="text-white font-bold text-lg">
                    ZubSphere
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition"
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="mt-auto flex items-center gap-2 text-white/50 hover:text-white text-sm transition"
              >
                ↗ Visit site
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatSidebar;