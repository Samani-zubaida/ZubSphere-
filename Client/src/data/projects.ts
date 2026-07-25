export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  status: string;
  statusColor: string;
  accent: string;
  image?: string;
  demolink: string;
  codelink: string;
}

export const projects: Project[] = [
  {
    name: "WayPoint",
    tagline: "An AI-Powered Travel Platform Built for Modern Explorers.",
    description:
      "WayPoint is an AI-powered travel and location discovery platform that enables users to explore destinations, share travel experiences, and discover nearby landmarks.",
    tech: ["React", "Node.js", "MongoDB", "Gemini API"],
    status: "🟡 Under Active Development (85%)",
    statusColor: "#facc15",
    accent: "#00D4FF",
    image: "waypoint.png",
    demolink: "https://way-point-blush.vercel.app/",
    codelink: "https://github.com/Samani-zubaida/WayPoint",
  },
  {
    name: "ChitChat",
    tagline: "Real-time bidirectional messaging using Socket.IO",
    description:
      "A real-time chat app with secure authentication, live messaging via WebSockets, online status, and persistent conversation history built on a Zustand + Socket.io stack.",
    tech: ["React", "Socket.io", "MongoDB", "Node.js & Express.js"],
    status: "🟢 Completed (100%)",
    statusColor: "#4ade80",
    accent: "#7C4DFF",
    image: "chitchat.png",
    demolink: "https://chit-chat-seven-tan.vercel.app/login/",
    codelink: "https://github.com/Samani-zubaida/chit-Chat",
  },
  {
    name: "Imagify",
    tagline: "AI-powered image generation app",
    description:
      "An app that generates AI artwork from text prompts, with secure auth, cloud-stored image history, and a clean responsive interface deployed on Vercel and Render.",
    tech: ["React", "Node.js", "Cloudinary", "AI API"],
    status: "🟢 Completed (100%)",
    statusColor: "#4ade80",
    accent: "#FF6B81",
    image: "imagify.png",
    demolink: "https://imagify-bice-omega.vercel.app/",
    codelink: "https://github.com/Samani-zubaida/imagify",
  },
  {
    name: "CodeNova",
    tagline: "DSA & algorithm visualizer",
    description:
      "An interactive platform that visualizes sorting, searching, graph traversal, and tree algorithms step-by-step, turning theoretical CS concepts into engaging animations.",
    tech: ["React", "TypeScript", "Canvas", "Framer Motion"],
    status: "🔵 Planning (20%)",
    statusColor: "#38bdf8",
    accent: "#FFD166",
    image: "codenova.png",
    demolink: "/",
    codelink: "https://github.com/samaniyusra/Code_Nova",
  },
];