import { createContext, useContext, useState } from "react";
import axios from "axios";

const ChatContext = createContext();

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Samani AI. Ask me anything about my education, projects, skills, experience, and achievements.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/chatbot/chat`,
        {
          message,
          history: updatedMessages,
        }
      );

      console.log("Backend Response:", response.data);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            response.data.reply ||
            "I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong while contacting the AI assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        loading,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);