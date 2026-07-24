import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { projects } from "../../data/projects";
import ProjectCard from "./ProjectCard";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const Projects = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = projects.length;
  const p = projects[index];

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setIndex((prev) => (prev + 1) % n), 6000);
  }, [n]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { setIndex((p) => (p + 1) % n); stopAuto(); }
      if (e.key === "ArrowLeft") { setIndex((p) => (p - 1 + n) % n); stopAuto(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, stopAuto]);

  useEffect(() => {
    let startX = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0
          ? setIndex((p) => (p + 1) % n)
          : setIndex((p) => (p - 1 + n) % n);
        stopAuto();
      }
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [n, stopAuto]);

  const goNext = useCallback(() => { setIndex((p) => (p + 1) % n); stopAuto(); }, [n, stopAuto]);
  const goPrev = useCallback(() => { setIndex((p) => (p - 1 + n) % n); stopAuto(); }, [n, stopAuto]);
  const goTo = useCallback((i: number) => { setIndex(i); stopAuto(); }, [stopAuto]);

  return (
    <section
      className="relative w-full overflow-hidden select-none"
      style={{ background: "#0a0a0a", height: "100vh", minHeight: "600px" }}
    >
      {/* Ambient glow — follows accent color */}
      <div
        className="absolute pointer-events-none transition-all duration-1000"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          background: `radial-gradient(ellipse at center, ${p.accent}08 0%, transparent 55%)`,
          borderRadius: "50%",
        }}
      />

      {/* Water reflection fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]"
        style={{
          height: isMobile ? 120 : 200,
          background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 40%, transparent 100%)",
        }}
      />

      {/* Big Nav Arrows — screen edges */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/5 bg-black/25 backdrop-blur-md flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:scale-110"
        aria-label="Previous"
      >
        <FiChevronLeft size={isMobile ? 20 : 26} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/5 bg-black/25 backdrop-blur-md flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all duration-300 hover:scale-110"
        aria-label="Next"
      >
        <FiChevronRight size={isMobile ? 20 : 26} />
      </button>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_420px_1fr] lg:grid-cols-[1fr_460px_1fr] gap-6 md:gap-0 items-center h-full w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-0">
        
        {/* LEFT: Big Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center order-2 md:order-1 text-center md:text-left relative z-[15]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-white/25 mb-4 font-medium">
                Featured Project
              </span>

              {/* Big title — slightly overlaps card on desktop */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-[-0.03em] mb-5">
                <span style={{ color: p.accent }}>{p.name}</span>
                <span className="block text-white/[0.06] mt-[-4px] md:mt-[-8px] text-3xl md:text-5xl lg:text-6xl">
                  {p.tagline.split(" ").slice(0, 2).join(" ")}
                </span>
              </h2>

              <p className="text-white/35 text-sm md:text-[15px] leading-[1.7] max-w-sm mx-auto md:mx-0 font-light">
                {p.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CENTER: Hero Card */}
        <div className="flex flex-col items-center justify-center order-1 md:order-2 relative z-[20]">
          <ProjectCard
            project={p}
            index={index}
            total={n}
            isMobile={isMobile}
            accent={p.accent}
            onLiveClick={() => window.open(p.demolink, "_blank", "noopener,noreferrer")}
          />
        </div>

        {/* RIGHT: Tech Stack (Main Highlight) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-center order-3 relative z-[15]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={p.name + "-tech"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center md:items-start"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 mb-5 font-medium">
                Built With
              </span>

              <div className="flex flex-row md:flex-col flex-wrap justify-center md:justify-start gap-3 md:gap-3">
                {p.tech.map((t, i) => (
                  <motion.div
                    key={t}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.08] transition-all duration-300 cursor-default"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: p.accent,
                        boxShadow: `0 0 10px ${p.accent}60`,
                      }}
                    />
                    <span className="text-white/70 text-[13px] font-semibold tracking-[-0.01em]">
                      {t}
                    </span>
                    <span className="hidden md:inline text-white/20 text-[11px] ml-auto">
                      {["Frontend", "Backend", "Database", "DevOps", "AI", "Design"][i % 6]}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Subtle hint */}
              <p className="mt-6 text-white/15 text-[10px] tracking-widest uppercase hidden md:block">
                Click card to view live
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Counter + Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-[10px] font-mono text-white/12 tracking-[0.1em] mb-3">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <div className="flex gap-2">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => goTo(i)}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === index ? p.accent : "rgba(255,255,255,0.06)",
                width: i === index ? 24 : 5,
                boxShadow: i === index ? `0 0 8px ${p.accent}40` : "none",
              }}
              aria-label={`Go to ${proj.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;