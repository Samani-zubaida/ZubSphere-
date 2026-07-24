import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading: boolean;
}

const ChatInput = ({ value, onChange, onSend, loading }: ChatInputProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      animate={{
        boxShadow: focused
          ? "0 0 0 1px rgba(0,212,255,0.5), 0 0 30px rgba(0,212,255,0.15)"
          : "0 0 0 1px rgba(255,255,255,0.1), 0 0 0px rgba(0,212,255,0)",
      }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 bg-white/[0.04] rounded-2xl px-5 py-4 backdrop-blur-md"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Message Samani AI..."
        className="flex-1 bg-transparent outline-none text-white placeholder-white/40"
      />
      <motion.button
        onClick={onSend}
        disabled={loading || !value.trim()}
        whileHover={{ scale: 1.08, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
        animate={
          value.trim() && !loading
            ? {
                boxShadow: [
                  "0 0 0px rgba(0,212,255,0.4)",
                  "0 0 18px rgba(0,212,255,0.55)",
                  "0 0 0px rgba(0,212,255,0.4)",
                ],
              }
            : { boxShadow: "0 0 0px rgba(0,212,255,0)" }
        }
        transition={
          value.trim() && !loading
            ? { boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
            : { duration: 0.3 }
        }
        className="w-10 h-10 rounded-full bg-[#00D4FF] text-black flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        aria-label="Send message"
      >
        <FiSend size={16} />
      </motion.button>
    </motion.div>
  );
};

export default ChatInput;