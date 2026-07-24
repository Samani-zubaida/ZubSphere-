import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import ChatOrb from "./ChatOrb";
import { useTypewriter } from "../../hooks/useTypewriter";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  animate: boolean; // true only for the newest assistant reply
}

const ChatMessage = ({ role, content, animate }: ChatMessageProps) => {
  const isUser = role === "user";
  const { displayed, done } = useTypewriter(content, !isUser && animate, 14);
  const text = isUser ? content : displayed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mb-1">
          <ChatOrb loading={!done} size={28} />
        </div>
      )}

      <div
        className={`relative max-w-[85%] md:max-w-[65%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-gradient-to-br from-[#00D4FF] to-[#00A8CC] text-black rounded-br-md"
            : "bg-white/[0.04] border border-white/10 text-white/90 rounded-bl-md backdrop-blur-sm"
        }`}
        style={
          isUser
            ? { boxShadow: "0 8px 24px -8px rgba(0,212,255,0.4)" }
            : undefined
        }
      >
        <div className="flex items-center gap-2 mb-1.5 text-[11px] font-medium tracking-wide opacity-60 uppercase">
          {isUser && <FiUser size={11} />}
          {isUser ? "You" : "Samani AI"}
        </div>
        <p className="leading-relaxed whitespace-pre-wrap text-[15px]">
          {text}
          {!isUser && !done && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
              className="inline-block w-[2px] h-[1em] bg-[#00D4FF] ml-0.5 align-middle"
            />
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;