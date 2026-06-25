import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiMessageSquare,
  FiUser,
  FiCpu,
} from "react-icons/fi";

import { useChat } from "../Context/ChatContext.jsx";

const suggestions = [
  "Who is Zubaida Samani?",
  "Tell me about your projects",
  "What technologies do you know?",
  "What are your AI/ML skills?",
];

const Chatbot = () => {
  const { messages, loading, sendMessage } =
    useChat();

  const [input, setInput] = useState("");

  const messagesRef = useRef(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (text = input) => {
    if (!text.trim() || loading) return;

    setInput("");
    await sendMessage(text);
  };

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-200/30 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200/30 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-sm font-medium mb-4">
            <FiCpu />
            AI Portfolio Assistant
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ask{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Samani AI
            </span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto">
            Learn about my projects, education,
            skills, experience and achievements
            through an AI-powered conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="
            bg-white/80
            backdrop-blur-xl
            border
            border-slate-200
            rounded-[32px]
            shadow-[0_20px_60px_rgba(15,23,42,0.08)]
            overflow-hidden
            flex
            flex-col
            h-[80vh]
            min-h-[650px]
          "
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-slate-200 px-6 py-5 bg-white/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                <FiMessageSquare size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-800">
                  Samani AI
                </h3>

                <p className="text-sm text-slate-500">
                  Personal Portfolio Assistant
                </p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex-shrink-0 px-5 py-4 border-b border-slate-100 flex flex-wrap gap-3">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(item)}
                disabled={loading}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-slate-100
                  hover:bg-cyan-100
                  hover:text-cyan-700
                  text-sm
                  transition-all
                  duration-300
                "
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="
              flex-1
              min-h-0
              overflow-y-auto
              px-5
              py-6
              space-y-5
            "
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`
                    max-w-[90%]
                    md:max-w-[75%]
                    rounded-3xl
                    px-5
                    py-4
                    shadow-sm
                    ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                        : "bg-slate-100 text-slate-700"
                    }
                  `}
                >
                  <div className="flex items-center gap-2 mb-2 text-xs opacity-80">
                    {msg.role === "user" ? (
                      <FiUser />
                    ) : (
                      <FiMessageSquare />
                    )}

                    {msg.role === "user"
                      ? "You"
                      : "Samani AI"}
                  </div>

                  <p className="leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-3xl px-5 py-4">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-slate-200 p-4 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleSend()
                }
                placeholder="Ask anything about Samani..."
                className="
                  flex-1
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-cyan-500
                  focus:ring-4
                  focus:ring-cyan-100
                "
              />

              <button
                disabled={loading}
                onClick={() => handleSend()}
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  text-white
                  flex
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                  duration-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Chatbot;