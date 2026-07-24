import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BackgroundWordProps {
  text: string;
}

/**
 * The oversized, low-opacity word sitting behind the portrait. A
 * gentle scroll-linked parallax drift adds depth without ever
 * threatening readability — it's decorative only, sits at z-0, and
 * `pointer-events-none` keeps it from ever intercepting clicks.
 */
const BackgroundWord = ({ text }: BackgroundWordProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
    >
      <motion.span
        style={{
          y,
          fontSize: "clamp(4rem, 16vw, 13rem)",
          opacity: 0.07,
          letterSpacing: "-0.03em",
        }}
        className="font-black uppercase leading-none whitespace-nowrap text-white"
      >
        {text}
      </motion.span>
    </div>
  );
};

export default BackgroundWord;