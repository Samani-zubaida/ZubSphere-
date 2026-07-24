import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, ".env"),
});

console.log("MONGO_URL:", process.env.MONGO_URL);

import chatbotRoutes from "./routes/chatbotRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://zub-sphere.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all Vercel preview deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});