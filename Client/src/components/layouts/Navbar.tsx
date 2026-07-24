import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Profile", to: "/#profile" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-md sm:w-auto sm:max-w-none">
      <nav
        className="no-scrollbar flex items-center gap-0.5 sm:gap-1 bg-black/60 backdrop-blur-md text-white rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 border border-white/10 overflow-x-auto justify-between sm:justify-start"
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        {navItems.map((item) => {
          // "Home" and "Profile" share the same route now (both live on
          // "/"), so the active state has to also check the hash —
          // otherwise they'd both light up together.
          const [itemPath, itemHash] = item.to.split("#");
          const isActive =
            location.pathname === (itemPath || "/") &&
            (itemHash ? location.hash === `#${itemHash}` : !location.hash);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`shrink-0 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                isActive
                  ? "bg-[#00D4FF] text-black"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          to="/chat"
          className="shrink-0 ml-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-black text-xs sm:text-sm font-semibold whitespace-nowrap"
        >
          Ask AI
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
