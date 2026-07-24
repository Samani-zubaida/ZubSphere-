import { motion } from "framer-motion";
import { FiArrowUpRight, FiCode, FiX } from "react-icons/fi";
import type { Project } from "../../data/projects";

interface ProjectInfoProps {
  project: Project;
  onClose: () => void;
}

const ProjectInfo = ({ project, onClose }: ProjectInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-full text-center md:text-left overflow-hidden"
    >
      {/* FIXED: Contained background title, no overflow */}
      <span
        className="absolute -top-4 md:-top-8 left-0 right-0 font-black uppercase leading-none whitespace-nowrap pointer-events-none select-none overflow-hidden text-ellipsis"
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          color: "white",
          opacity: 0.04,
          letterSpacing: "-0.02em",
        }}
      >
        {project.name}
      </span>

      <button
        onClick={onClose}
        className="hidden md:inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs tracking-wide uppercase transition mb-4"
      >
        <FiX size={14} /> Back to all
      </button>

      <div className="relative z-10">
        <span
          className="block text-xs font-mono tracking-widest uppercase mb-2"
          style={{ color: project.accent }}
        >
          Featured Project
        </span>

        <h3 className="text-2xl md:text-4xl font-black text-white uppercase leading-tight mb-3">
          {project.name}
        </h3>

        <p className="text-white/80 text-base md:text-lg font-semibold leading-snug mb-3">
          {project.tagline}
        </p>

        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-5 max-w-md mx-auto md:mx-0">
          {project.description}
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium border text-white/80"
              style={{ borderColor: `${project.accent}44` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex justify-center md:justify-start gap-3">
          <a
            href={project.demolink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition hover:scale-105 active:scale-95"
            style={{ backgroundColor: project.accent, color: "#0a0a0a" }}
          >
            Live Site <FiArrowUpRight size={14} />
          </a>

          <a
            href={project.codelink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition hover:scale-105 active:scale-95"
            style={{ borderColor: `${project.accent}55`, color: project.accent }}
          >
            Code <FiCode size={14} />
          </a>
        </div>

        <button
          onClick={onClose}
          className="md:hidden mt-6 text-white/40 hover:text-white text-xs tracking-wide uppercase transition"
        >
          ← Back to all
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectInfo;