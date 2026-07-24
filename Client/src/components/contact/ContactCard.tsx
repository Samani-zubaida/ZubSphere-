import { motion } from "framer-motion";
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiInstagram } from "react-icons/fi";
import type { Contact } from "../../data/contacts";

const iconMap: Record<Contact["icon"], React.ElementType> = {
  whatsapp: FiPhone,
  email: FiMail,
  linkedin: FiLinkedin,
  github: FiGithub,
  instagram: FiInstagram,
};

interface ContactCardProps {
  contact: Contact;
  x: number;
  rotateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isCenter: boolean;
  isVisible: boolean;
  onSelect: () => void;
  index: number;
  total: number;
}

const MARBLE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=600&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=600&fit=crop&q=80",
];

const ContactCard = ({
  contact,
  x,
  rotateY,
  scale,
  opacity,
  zIndex,
  isCenter,
  isVisible,
  onSelect,
  index,
}: ContactCardProps) => {
  const Icon = iconMap[contact.icon];

  return (
    <>
      {/* Main Card */}
      <motion.div
        animate={{ x, rotateY, scale, opacity }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          zIndex,
          pointerEvents: isVisible ? "auto" : "none",
          position: "absolute",
          width: 140,
          height: 200,
          borderRadius: 16,
          overflow: "hidden",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          boxShadow: isCenter
            ? `0 20px 60px ${contact.color}33, 0 0 80px ${contact.color}15, 0 0 0 1px ${contact.color}44`
            : "0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
        onClick={() => {
          if (isCenter) {
            window.open(contact.link, "_blank", "noopener,noreferrer");
          } else {
            onSelect();
          }
        }}
        className="group"
      >
        {/* Label above card */}
        <div
          className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-400"
          style={{ color: isCenter ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
        >
          {contact.title}
        </div>

        {/* Marble image background */}
        <img
          src={MARBLE_IMAGES[index % MARBLE_IMAGES.length]}
          alt={contact.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Top gloss overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Border glow for center */}
        {isCenter && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 30px ${contact.color}22`,
            }}
          />
        )}

        {/* Icon badge */}
        <div
          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md"
          style={{
            backgroundColor: `${contact.color}25`,
            color: contact.color,
            border: `1px solid ${contact.color}40`,
          }}
        >
          <Icon size={16} />
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-xs font-bold truncate">{contact.title}</p>
          {isCenter && (
            <p className="text-white/50 text-[9px] mt-0.5 truncate">{contact.value}</p>
          )}
        </div>
      </motion.div>

      {/* Reflection */}
      <motion.div
        animate={{ x, rotateY, scale, opacity: isCenter ? 0.18 : opacity * 0.08 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          zIndex: zIndex - 1,
          position: "absolute",
          width: 140,
          height: 200,
          borderRadius: 16,
          overflow: "hidden",
          pointerEvents: "none",
          transform: `translateY(220px) scaleY(-1)`,
          filter: "blur(2px)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 60%)",
        }}
      >
        <img
          src={MARBLE_IMAGES[index % MARBLE_IMAGES.length]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    </>
  );
};

export default ContactCard;