import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAutoRotate } from "../../hooks/useAutoRotate";
import ContactCard from "./ContactCard";
import type { Contact } from "../../data/contacts";

interface ContactFanProps {
  contacts: Contact[];
}

const CARD_SPACING = 160;
const MAX_VISIBLE_OFFSET = 3;

const ContactFan = ({ contacts }: ContactFanProps) => {
  const n = contacts.length;
  const { index, setIsHovering, goNext, goPrev, goTo } = useAutoRotate({
    length: n,
    intervalMs: 4000,
  });

  const current = contacts[index];

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { goNext(); setIsHovering(true); }
      if (e.key === "ArrowLeft") { goPrev(); setIsHovering(true); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, setIsHovering]);

  // Touch/swipe support
  useEffect(() => {
    let touchStartX = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goNext() : goPrev();
        setIsHovering(true);
      }
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [goNext, goPrev, setIsHovering]);

  const handleCardClick = useCallback((i: number, isCenter: boolean, contact: Contact) => {
    if (isCenter) {
      window.open(contact.link, "_blank", "noopener,noreferrer");
    } else {
      goTo(i);
      setIsHovering(true);
    }
  }, [goTo, setIsHovering]);

  return (
    <div
      className="hidden md:flex flex-col items-center w-full relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel Stage */}
      <div
        className="relative w-full h-72 flex items-center justify-center select-none"
        style={{ perspective: 1400 }}
      >
        {/* Cards container */}
        <div className="absolute inset-0 flex items-center justify-center">
          {contacts.map((contact, i) => {
            let offset = i - index;
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const isCenter = offset === 0;
            const abs = Math.abs(offset);
            const isVisible = abs <= MAX_VISIBLE_OFFSET;

            const x = offset * CARD_SPACING;
            const scale = isCenter ? 1.08 : Math.max(0.6, 1 - abs * 0.18);
            const rotateY = offset * -18;
            const opacity = isVisible ? Math.max(0.2, 1 - abs * 0.28) : 0;
            const zIndex = 50 - abs;

            return (
              <ContactCard
                key={contact.id}
                contact={contact}
                index={i}
                total={n}
                x={x}
                rotateY={rotateY}
                scale={scale}
                opacity={opacity}
                zIndex={zIndex}
                isCenter={isCenter}
                isVisible={isVisible}
                onSelect={() => handleCardClick(i, isCenter, contact)}
              />
            );
          })}
        </div>

        {/* Reflection surface overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(5,5,16,0.9) 0%, rgba(5,5,16,0.3) 40%, transparent 100%)",
          }}
        />

        {/* Navigation Arrows */}
        <button
          onClick={() => { goPrev(); setIsHovering(true); }}
          className="absolute left-4 lg:left-8 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
          aria-label="Previous contact"
        >
          <FiChevronLeft size={18} />
        </button>
        <button
          onClick={() => { goNext(); setIsHovering(true); }}
          className="absolute right-4 lg:right-8 z-30 w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300"
          aria-label="Next contact"
        >
          <FiChevronRight size={18} />
        </button>
      </div>

      {/* Bottom Info Bar */}
      <div className="flex flex-col items-center mt-6 z-20">
        {/* Counter */}
        <p className="text-white/25 text-[11px] tracking-[0.15em] font-mono mb-1">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </p>

        {/* Title */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-white/60 text-sm tracking-wide"
          >
            {current.title} — <span style={{ color: current.color }}>{current.value}</span>
          </motion.p>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {contacts.map((c, i) => (
            <button
              key={c.id}
              onClick={() => { goTo(i); setIsHovering(true); }}
              aria-label={`Go to ${c.title}`}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: i === index ? current.color : "rgba(255,255,255,0.15)",
                width: i === index ? "20px" : "6px",
              }}
            />
          ))}
        </div>

        <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase mt-4">
          Drag · Swipe · Arrow Keys
        </p>
      </div>
    </div>
  );
};

export default ContactFan;