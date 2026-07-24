import { FiPause, FiPlay } from "react-icons/fi";
import type { Project } from "../../data/projects";

interface ProjectDotsProps {
  projects: Project[];
  activeIndex: number;
  activeColor: string;
  isPlaying: boolean;
  onDotClick: (i: number) => void;
  onTogglePlay: () => void;
}

const ProjectDots = ({
  projects,
  activeIndex,
  activeColor,
  isPlaying,
  onDotClick,
  onTogglePlay,
}: ProjectDotsProps) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
      <div className="flex gap-2">
        {projects.map((p, i) => (
          <button
            key={p.name}
            onClick={() => onDotClick(i)}
            aria-label={`Go to ${p.name}`}
            className="h-1.5 rounded-full transition-all duration-400"
            style={{
              backgroundColor:
                i === activeIndex ? activeColor : "rgba(255,255,255,0.2)",
              width: i === activeIndex ? "20px" : "6px",
            }}
          />
        ))}
      </div>
      <button
        onClick={onTogglePlay}
        className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition ml-1"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <FiPause size={12} /> : <FiPlay size={12} className="ml-0.5" />}
      </button>
    </div>
  );
};

export default ProjectDots;