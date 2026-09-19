import mongoose from "mongoose";
import { env } from "./env.js";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(env.MONGO_URI)
      .then(() => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("MongoDB connection failed:", error);
        throw error;
      });
  }

  await connectionPromise;
}