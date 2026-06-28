import mongoose, { Schema } from "mongoose"

export const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected:${process.env.MONGO_URL}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
