import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Skill } from "../../data/skills";

interface SkillChipProps {
  skill: Skill;
  index: number;
}

const SkillChip = ({ skill, index }: SkillChipProps) => {
  const Icon = skill.icon;

  // ── 3D tilt state ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 25, stiffness: 280 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), spring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), spring);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      // ── Entrance animation ──
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center gap-2.5 group"
    >
      {/* ── Icon square ── */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: `linear-gradient(145deg, ${skill.color}15, ${skill.color}05)`,
          borderColor: `${skill.color}20`,
          boxShadow: `0 8px 32px ${skill.color}10`,
        }}
        whileHover={{
          scale: 1.14,
          borderColor: `${skill.color}55`,
          boxShadow: `0 20px 50px ${skill.color}30, 0 0 0 1px ${skill.color}40`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] md:w-[88px] md:h-[88px] rounded-[22px] flex items-center justify-center cursor-pointer border backdrop-blur-sm overflow-hidden"
      >
        {/* Top sheen on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 10%, ${skill.color}50, transparent 55%)`,
          }}
        />

        {/* Bottom tint on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${skill.color}18, transparent)`,
          }}
        />

        {/* Icon — pushed forward in 3D space */}
        <motion.div style={{ transform: "translateZ(24px)" }}>
          <Icon
            size={30}
            className="relative z-10 drop-shadow-lg"
            style={{ color: skill.color }}
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>

      {/* ── Label ── */}
      <motion.span
        className="text-[10px] sm:text-[11px] font-medium text-white/35 group-hover:text-white/70 transition-colors duration-300 tracking-widest uppercase"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  );
};

export default SkillChip;