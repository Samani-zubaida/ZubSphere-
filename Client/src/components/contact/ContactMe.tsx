import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiMail, FiPhone, FiLinkedin, FiGithub, FiInstagram } from "react-icons/fi";
import { contacts as baseContacts } from "../../data/contacts";
import type { Contact } from "../../data/contacts";

const iconMap: Record<Contact["icon"], React.ElementType> = {
  whatsapp: FiPhone,
  email: FiMail,
  linkedin: FiLinkedin,
  github: FiGithub,
  instagram: FiInstagram,
};

// Liquid marble abstract art for card backgrounds
const MARBLE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=600&fit=crop&q=80",
];

const ContactMe = () => {
  const [index, setIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const n = baseContacts.length;

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-rotate
  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % n);
    }, 4500);
  }, [n]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, [startAuto, stopAuto]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { setIndex((p) => (p + 1) % n); stopAuto(); }
      if (e.key === "ArrowLeft") { setIndex((p) => (p - 1 + n) % n); stopAuto(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [n, stopAuto]);

  // Touch swipe
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

  const current = baseContacts[index];

  const goTo = (i: number) => {
    setIndex(i);
    stopAuto();
  };

  const goNext = () => { setIndex((p) => (p + 1) % n); stopAuto(); };
  const goPrev = () => { setIndex((p) => (p - 1 + n) % n); stopAuto(); };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "#0a0a0a",
        height: "100vh",
        minHeight: "600px",
      }}
    >
      {/* Ambient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: "45vw",
          height: "45vw",
          background: "radial-gradient(circle, rgba(124,77,255,0.03) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* Content — everything centered vertically */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6 md:mb-10"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase mb-3"
            style={{ backgroundColor: "rgba(0,212,255,0.08)", color: "#00D4FF" }}
          >
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
            Let's <span className="text-white/20">Connect</span>
          </h2>
          <p className="mt-2 text-white/30 text-xs md:text-sm max-w-sm mx-auto">
            Reach out for collaborations, internships, or just to say hello
          </p>
        </motion.div>

        {/* Carousel Stage */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            height: isMobile ? 200 : 280,
            perspective: 1400,
          }}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* Reflection fade overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
            style={{
              height: isMobile ? 80 : 120,
              background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)",
            }}
          />

          {/* Cards */}
          {baseContacts.map((contact, i) => {
            let offset = i - index;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const abs = Math.abs(offset);
            const isCenter = offset === 0;
            const isVisible = abs <= 3;

            const spacing = isMobile ? 95 : 150;
            const x = offset * spacing;
            const y = abs * (isMobile ? 5 : 6);
            const rotateY = offset * (isMobile ? -14 : -16);
            const scale = isCenter ? 1.06 : Math.max(0.6, 1 - abs * 0.17);
            const opacity = isVisible ? Math.max(0.2, 1 - abs * 0.26) : 0;
            const zIdx = 50 - abs;

            const cardW = isMobile ? 85 : 130;
            const cardH = isMobile ? 120 : 185;

            const shadow = isCenter
              ? `0 18px 50px ${contact.color}30, 0 0 70px ${contact.color}10, 0 0 0 1px ${contact.color}35`
              : "0 4px 18px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)";

            return (
              <div key={contact.id}>
                {/* Reflection */}
                <motion.div
                  animate={{
                    x,
                    y: y + cardH + (isMobile ? 8 : 12),
                    rotateY,
                    scale,
                    opacity: isCenter ? 0.14 : opacity * 0.07,
                  }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute pointer-events-none"
                  style={{
                    width: cardW,
                    height: cardH,
                    borderRadius: isMobile ? 12 : 14,
                    overflow: "hidden",
                    zIndex: zIdx - 1,
                    transform: "scaleY(-1)",
                    filter: "blur(2px)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 55%)",
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 55%)",
                    left: "50%",
                    marginLeft: -cardW / 2,
                    marginTop: -cardH / 2,
                  }}
                >
                  <img
                    src={MARBLE_IMAGES[i % MARBLE_IMAGES.length]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Main Card */}
                <motion.div
                  animate={{
                    x,
                    y,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute cursor-pointer group"
                  style={{
                    width: cardW,
                    height: cardH,
                    borderRadius: isMobile ? 12 : 14,
                    overflow: "hidden",
                    zIndex: zIdx,
                    boxShadow: shadow,
                    transformStyle: "preserve-3d",
                    left: "50%",
                    marginLeft: -cardW / 2,
                    marginTop: -cardH / 2,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      window.open(contact.link, "_blank", "noopener,noreferrer");
                    } else {
                      goTo(i);
                    }
                  }}
                >
                  {/* Label */}
                  <div
                    className="absolute -top-5 md:-top-6 left-1/2 -translate-x-1/2 text-[8px] md:text-[9px] tracking-[0.15em] uppercase whitespace-nowrap z-20 transition-colors duration-400"
                    style={{ color: isCenter ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}
                  >
                    {contact.title}
                  </div>

                  {/* Marble image */}
                  <img
                    src={MARBLE_IMAGES[i % MARBLE_IMAGES.length]}
                    alt={contact.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gloss overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 35%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[35%] pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
                    }}
                  />

                  {/* Center glow inset */}
                  {isCenter && (
                    <div
                      className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
                      style={{ boxShadow: `inset 0 0 30px ${contact.color}18` }}
                    />
                  )}

                  {/* Icon badge */}
                  <div
                    className="absolute top-2 left-2 md:top-2.5 md:left-2.5 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center backdrop-blur-md z-20"
                    style={{
                      backgroundColor: `${contact.color}20`,
                      color: contact.color,
                      border: `1px solid ${contact.color}35`,
                    }}
                  >
                    {(() => {
                      const Icon = iconMap[contact.icon];
                      return <Icon size={isMobile ? 12 : 14} />;
                    })()}
                  </div>
                </motion.div>
              </div>
            );
          })}

          {/* Nav arrows */}
          <button
            onClick={goPrev}
            className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/8 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            aria-label="Previous"
          >
            <FiChevronLeft size={isMobile ? 14 : 18} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/8 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/35 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-300"
            aria-label="Next"
          >
            <FiChevronRight size={isMobile ? 14 : 18} />
          </button>
        </div>

        {/* Bottom Info Bar */}
        <div className="flex flex-col items-center mt-4 md:mt-6 z-20">
          <div className="text-[10px] text-white/20 tracking-[0.1em] font-mono mb-1">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-white/50 text-xs md:text-sm tracking-wide font-medium"
            >
              {current.title} — <span style={{ color: current.color }}>{current.value}</span>
            </motion.p>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex gap-1.5 mt-3">
            {baseContacts.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(i)}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === index ? current.color : "rgba(255,255,255,0.12)",
                  width: i === index ? 18 : 5,
                }}
                aria-label={`Go to ${c.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;