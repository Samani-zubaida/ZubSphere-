import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "../../data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  isMobile: boolean;
  accent: string;
  onLiveClick: () => void;
}

const ProjectCard = ({
  project,
  index,
  isMobile,
  accent,
  onLiveClick,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 250, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 250, damping: 25 });

  // Shine follows mouse
  const shineX = useTransform(springTiltY, [-20, 20], [0, 100]);
  const shineY = useTransform(springTiltX, [-20, 20], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltY.set(px * 18);
    tiltX.set(-py * 18);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setIsHovered(false);
  };

  const cardW = isMobile ? 240 : 340;
  const cardH = isMobile ? 320 : 460;

  return (
    <div className="relative" style={{ width: cardW, height: cardH }}>
      {/* Ripple rings behind */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-[inherit]"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: isMobile ? 20 : 28,
              border: `1px solid ${accent}12`,
              animation: "ripplePulse 3s ease-out infinite",
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        ref={cardRef}
        className="relative w-full h-full rounded-[20px] md:rounded-[28px] overflow-hidden cursor-pointer"
        style={{
          rotateX: springTiltX,
          rotateY: springTiltY,
          transformStyle: "preserve-3d",
          perspective: 1000,
          background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.15) 100%)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: isHovered
            ? `0 40px 100px ${accent}20, 0 0 140px ${accent}08, inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 1px ${accent}20`
            : `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 100px ${accent}06`,
          transition: "box-shadow 0.5s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onLiveClick}
      >
        {/* Top arc highlight */}
        <div
          className="absolute -top-[30%] left-[15%] right-[15%] h-[70%] rounded-[50%] pointer-events-none z-[3]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
        />

        {/* Moving shine */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[4]"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.12) 0%, transparent 50%)`,
            opacity: isHovered ? 0.5 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Inner gradient */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
          }}
        />

        {/* Project image */}
        <img
          src={project.image}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          draggable={false}
          loading="lazy"
        />

        {/* Arrow icon — top right, click goes live */}
        <div
          className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center z-[5] transition-all duration-300"
          style={{
            backgroundColor: isHovered ? `${accent}20` : "rgba(0,0,0,0.25)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isHovered ? accent + "40" : "rgba(255,255,255,0.06)"}`,
            color: isHovered ? accent : "rgba(255,255,255,0.4)",
            transform: isHovered ? "translate(2px, -2px)" : "translate(0, 0)",
          }}
        >
          <FiArrowUpRight size={isMobile ? 16 : 18} />
        </div>

        {/* Bottom content */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-[4]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
          }}
        >
          <span
            className="block text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1"
            style={{ color: accent }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-base md:text-xl font-bold text-white tracking-tight">
            {project.name}
          </h3>
        </div>
      </motion.div>

      {/* Reflection in water */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: isMobile ? -130 : -200,
          width: cardW,
          height: isMobile ? 130 : 200,
          transform: "translateX(-50%) scaleY(-1)",
          opacity: 0.08,
          filter: "blur(4px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 70%)",
          borderRadius: `0 0 ${isMobile ? 20 : 28}px ${isMobile ? 20 : 28}px`,
          overflow: "hidden",
        }}
      >
        <img src={project.image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Ripple keyframes */}
      <style>{`
        @keyframes ripplePulse {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(1.18); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;