import { motion, useTransform, useMotionTemplate } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { heroScrollProgress } from "../Context/ScrollProgressContext";

const FlyingPortrait = () => {
  const location = useLocation();
  const scrollYProgress = heroScrollProgress;
  const isHome = location.pathname === "/";

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const mobileCutoff = useTransform(scrollYProgress, (p) =>
    isMobile && p > 0.12 ? 0 : 1
  );

  // Position
  const top = useTransform(scrollYProgress, [0, 1], ["84vh", "50vh"]);
  const width = useTransform(scrollYProgress, [0, 1], ["36vmin", "42vmin"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // IMAGE FILTER: grayscale(1) at start → grayscale(0) at end
  // 0° (Hero): B&W photo | 360° (Profile): Full color photo
  const grayscale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const saturate = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);
  const filter = useTransform(
    [grayscale, saturate],
    ([g, s]) => `grayscale(${g}) saturate(${s})`
  );

  const backdrop = useTransform(scrollYProgress, [0, 1], ["#0a0a0a", "#00D4FF"]);
  const borderColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(255,255,255,0.22)", "rgba(255,255,255,0.1)"]
  );
  const border = useMotionTemplate`1.5px solid ${borderColor}`;
  const glow = useTransform(scrollYProgress, [0, 1], [
    "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px -20px rgba(0,0,0,0.6)",
    "0 0 0 1px rgba(255,255,255,0.03), 0 0 50px -8px rgba(0,212,255,0.45)",
  ]);

  return (
    <motion.div
      className="fixed z-10 left-1/2 aspect-[4/5] pointer-events-none"
      style={{ top, width, x: "-50%", y: "-50%", perspective: 1600 }}
      animate={{ opacity: isHome ? 1 : 0, scale: isHome ? 1 : 0.92 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div style={{ opacity: mobileCutoff, width: "100%", height: "100%" }}>
        <motion.div
          style={{ rotate, transformStyle: "preserve-3d", width: "100%", height: "100%" }}
        >
          <motion.div
            style={{
              rotateY,
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* FRONT face — PHOTO (B&W → Color) */}
            <motion.div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 rounded-2xl overflow-hidden"
            >
              <motion.div
                style={{ backgroundColor: backdrop, boxShadow: glow }}
                className="absolute inset-0 rounded-2xl"
              />
              {/* Image: grayscale(1) at scroll 0 → grayscale(0) at scroll 1 */}
              <motion.img
                src="/self.png"
                alt="Zubaida Samani"
                style={{ filter, border }}
                className="relative w-full h-full object-cover rounded-2xl"
              />
            </motion.div>

            {/* BACK face — solid color card */}
            <motion.div
              style={{ rotateY: 180, backfaceVisibility: "hidden", boxShadow: glow }}
              className="absolute inset-0 rounded-2xl bg-[#00D4FF] border border-white/20"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FlyingPortrait;