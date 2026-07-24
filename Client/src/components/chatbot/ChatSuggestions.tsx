import { motion } from "framer-motion";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (text: string) => void;
  disabled: boolean;
}

const ChatSuggestions = ({ suggestions, onSelect, disabled }: ChatSuggestionsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.4, ease: "easeOut" }}
          whileHover={{
            y: -3,
            borderColor: "rgba(0,212,255,0.5)",
            boxShadow: "0 10px 30px -12px rgba(0,212,255,0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(s)}
          disabled={disabled}
          className="text-left bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white/70 text-sm transition-colors hover:text-white disabled:opacity-50"
        >
          {s}
        </motion.button>
      ))}
    </div>
  );
};

export default ChatSuggestions;