import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "../../Context/ChatContext";
import { chatSuggestions } from "../../data/chatSuggestions";
import { useTimeGreeting } from "../../hooks/useTimeGreeting";
import ChatSidebar from "./ChatSidebar";
import ChatOrb from "./ChatOrb";
import ChatInput from "./ChatInput";
import ChatSuggestions from "./ChatSuggestions";
import ChatMessage from "./ChatMessage";

const Chatbot = () => {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const greeting = useTimeGreeting();

  const hasConversation = messages.length > 1;

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;
    setInput("");
    await sendMessage(text);
  };

  return (
    <section className="relative flex h-screen w-full bg-[#060608] overflow-hidden">
      {/* ---- Ambient background: slow-drifting color blobs ---- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.14), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-8rem] right-[-6rem] w-[32rem] h-[32rem] rounded-full blur-[130px]"
          style={{ background: "radial-gradient(circle, rgba(124,77,255,0.14), transparent 70%)" }}
        />
      </div>

      <ChatSidebar />

      <div className="relative flex-1 flex flex-col px-6 md:px-12 py-10 min-h-0">
        <AnimatePresence mode="wait">
          {!hasConversation ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <ChatOrb loading={loading} />

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-6 text-2xl md:text-3xl font-bold text-white"
              >
                {greeting}, I'm Samani AI.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white/50 mt-1"
              >
                Ask me anything about Zubaida's work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-full max-w-2xl mt-10"
              >
                <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} loading={loading} />
                <ChatSuggestions suggestions={chatSuggestions} onSelect={(s) => handleSend(s)} disabled={loading} />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col min-h-0"
            >
              <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                <ChatOrb loading={loading} size={40} />
                <div>
                  <h3 className="text-white font-semibold">Samani AI</h3>
                  <p className="text-white/40 text-xs">Personal Portfolio Assistant</p>
                </div>
              </div>

              <div ref={messagesRef} className="flex-1 min-h-0 overflow-y-auto space-y-5 pr-2">
                {messages.map((msg, idx) => (
                  <ChatMessage
                    key={idx}
                    role={msg.role}
                    content={msg.content}
                    animate={msg.role === "assistant" && idx === messages.length - 1}
                  />
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start items-end gap-2.5"
                  >
                    <ChatOrb loading size={28} />
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-bl-md px-5 py-4 flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-4 flex-shrink-0">
                <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} loading={loading} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Chatbot;