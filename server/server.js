import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
  connectDB();
});