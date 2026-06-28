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
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://zub-sphere.vercel.app/",
    ],
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