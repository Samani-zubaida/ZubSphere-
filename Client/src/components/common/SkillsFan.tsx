import { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Skill } from "../../data/skills";

interface SkillsFanProps {
  items: Skill[];
}

const SkillIcon = ({ skill, index }: { skill: Skill; index: number }) => {
  const Icon = skill.icon;

  // ── 3D tilt ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 25, stiffness: 280 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), spring);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.03,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center gap-1 group"
    >
      {/* Icon square */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `linear-gradient(145deg, ${skill.color}10, ${skill.color}02)`,
          borderColor: `${skill.color}18`,
          boxShadow: `0 4px 16px ${skill.color}06`,
        }}
        whileHover={{
          scale: 1.1,
          borderColor: `${skill.color}50`,
          boxShadow: `0 12px 32px ${skill.color}18, 0 0 0 1px ${skill.color}30`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[14px] flex items-center justify-center cursor-pointer border backdrop-blur-sm overflow-hidden"
      >
        {/* Top sheen */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 8%, ${skill.color}30, transparent 50%)`,
          }}
        />

        {/* Bottom tint */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${skill.color}08, transparent)`,
          }}
        />

        {/* Icon */}
        <motion.div style={{ transform: "translateZ(14px)" }}>
          <Icon
            size={30}
            className="relative z-10 drop-shadow-sm"
            style={{ color: skill.color }}
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>

      {/* Label */}
      <span
        className="text-[10px] sm:text-[10px] font-medium text-white/25 group-hover:text-white/50 transition-colors duration-300 tracking-wider uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillsFan = ({ items }: SkillsFanProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 place-items-center">
      {items.map((item, index) => (
        <SkillIcon key={item.name} skill={item} index={index} />
      ))}
    </div>
  );
};

export default SkillsFan;