import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  loading: boolean;
  sendMessage: (message: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const API_URL: string =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi 👋 I'm Samani AI. Ask me anything about my education, projects, skills, experience, and achievements.",
    },
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (message: string) => {
    if (!message.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: message,
    };

    const updatedMessages: ChatMessage[] = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chatbot/chat`, {
        message,
        history: updatedMessages,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.reply || "I couldn't generate a response.",
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

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
