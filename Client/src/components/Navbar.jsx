import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="
      fixed
      top-0
      left-0
      w-full
      z-50
      bg-white/80
      backdrop-blur-xl
      border-b
      border-slate-200
      shadow-sm
    "
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Logo */}

        <Link to="/" className="flex flex-col leading-tight">
          <h1
            className="
      text-2xl
      md:text-3xl
      font-extrabold
      tracking-wide
      text-slate-900
    "
          >
            <span className="text-cyan-600">&lt;</span>
            ZubSphere
            <span className="text-cyan-600">/&gt;</span>
          </h1>

          <p
            className="
      hidden md:block
      text-[11px]
      text-slate-800
      font-medium
      tracking-wide
    "
          >
            The Center of My Work, Ideas, and Technical Growth.
          </p>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-slate-600 font-medium hover:text-cyan-600 transition"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="text-slate-600 font-medium hover:text-cyan-600 transition"
          >
            Projects
          </Link>

          <Link
            to="/chat"
            className="text-slate-600 font-medium hover:text-cyan-600 transition"
          >
            AI Assistant
          </Link>
        </div>

        {/* Desktop Social Buttons */}

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Samani-zubaida"
            target="_blank"
            rel="noreferrer"
            className="
            px-4 py-2
            rounded-xl
            border
            border-slate-300
            bg-white
            text-slate-700
            font-medium
            hover:border-cyan-500
            hover:text-cyan-600
            transition-all
          "
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/zubaida-samani-b6591a386/"
            target="_blank"
            rel="noreferrer"
            className="
            px-4 py-2
            rounded-xl
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            font-medium
            transition-all
          "
          >
            LinkedIn
          </a>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
          md:hidden
          text-slate-800
          text-3xl
          font-bold
        "
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}

      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-6 bg-white border-t border-slate-200">
          <div className="flex flex-col gap-5 pt-5">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              Home
            </Link>

            <Link
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              Projects
            </Link>

            <Link
              to="/chat"
              onClick={() => setMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              AI Assistant
            </Link>

            {/* Mobile Buttons */}

            <div className="flex gap-3 pt-3">
              <a
                href="https://github.com/Samani-zubaida"
                target="_blank"
                rel="noreferrer"
                className="
                flex-1
                text-center
                px-4 py-3
                rounded-xl
                border
                border-slate-300
                text-slate-700
                font-medium
              "
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/zubaida-samani-b6591a386/"
                target="_blank"
                rel="noreferrer"
                className="
                flex-1
                text-center
                px-4 py-3
                rounded-xl
                bg-cyan-600
                text-white
                font-medium
              "
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
