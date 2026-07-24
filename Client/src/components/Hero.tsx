import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const glyphs = [
  { char: "{ }", x: "8%", y: "10%", size: "text-4xl md:text-6xl", opacity: 1, duration: 6, delay: 0, yMove: [-25, 0], xMove: [10, 0], rot: [6, 0] },
  { char: "</>", x: "88%", y: "60%", size: "text-3xl md:text-5xl", opacity: 1, duration: 7, delay: 0.5, yMove: [20, 0], xMove: [-15, 0], rot: [20, 12] },
  { char: ";", x: "12%", y: "58%", size: "text-2xl md:text-4xl", opacity: 0.6, duration: 5, delay: 1, yMove: [-18, 0], xMove: [0, 0], rot: [-8, 0] },
  { char: "=>", x: "86%", y: "24%", size: "text-2xl md:text-4xl", opacity: 0.6, duration: 8, delay: 1.5, yMove: [22, 0], xMove: [12, 0], rot: [10, 0] },
  { char: "( )", x: "75%", y: "12%", size: "text-xl md:text-3xl", opacity: 0.4, duration: 9, delay: 0.3, yMove: [-15, 0], xMove: [8, 0], rot: [5, 0] },
  { char: "&&", x: "18%", y: "75%", size: "text-xl md:text-3xl", opacity: 0.35, duration: 6.5, delay: 0.8, yMove: [18, 0], xMove: [-10, 0], rot: [-6, 0] },
  { char: "[]", x: "50%", y: "8%", size: "text-lg md:text-2xl", opacity: 0.3, duration: 10, delay: 1.2, yMove: [-12, 0], xMove: [0, 0], rot: [4, 0] },
  { char: "++", x: "65%", y: "80%", size: "text-lg md:text-2xl", opacity: 0.25, duration: 7.5, delay: 0.6, yMove: [15, 0], xMove: [6, 0], rot: [-5, 0] },
];

const Glyph = ({ g, smoothMouseX, smoothMouseY, index }: any) => {
  const intensity = 12 + index * 6;
  const parallaxX = useTransform(smoothMouseX, (v: number) => v * intensity);
  const parallaxY = useTransform(smoothMouseY, (v: number) => v * intensity);

  return (
    <motion.div
      className={`absolute ${g.size} font-bold select-none text-[#00D4FF]`}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        left: g.x,
        top: g.y,
        opacity: g.opacity,
        x: parallaxX,
        y: parallaxY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: g.opacity,
        scale: 1,
        y: g.yMove,
        x: g.xMove,
        rotate: g.rot,
      }}
      transition={{
        opacity: { duration: 1, delay: g.delay },
        scale: { duration: 0.8, delay: g.delay },
        y: { duration: g.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        x: { duration: g.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: g.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      }}
    >
      {g.char}
    </motion.div>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 2);
      mouseY.set((clientY / innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 pb-32 sm:pb-20 md:pb-32">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #00D4FF 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
          left: useTransform(smoothMouseX, (v) => `calc(50% + ${v * 100}px - 200px)`),
          top: useTransform(smoothMouseY, (v) => `calc(42% + ${v * 60}px - 200px)`),
        }}
      />

      {/* Glyphs */}
      {glyphs.map((g, i) => (
        <Glyph key={i} g={g} smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} index={i} />
      ))}

      {/* Typography — shifted slightly up */}
      <div className="relative z-10 flex flex-col items-center -mt-6 md:-mt-10">
        {/* CE */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[15vw] md:text-[9vw] leading-[0.85] font-black text-white text-center tracking-tighter uppercase"
            style={{ fontFamily: "'General Sans', sans-serif" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            {"CE".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 80, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Student — SOLID white, different font style */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[15vw] md:text-[9vw] leading-[0.85] font-black text-white text-center tracking-tighter uppercase"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              textShadow: "0 0 30px rgba(0,212,255,0.12)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            {"Student".split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.6 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          className="mt-4 md:mt-6 text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 font-medium"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Computer Engineering
        </motion.p>

        {/* Line */}
        <motion.div
          className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 100, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
        />
      </div>
    </section>
  );
};

export default Hero;