import mongoose from "mongoose";
import { env } from "../config/env.js";
import { Media } from "../models/Media.js";

async function clearMediaCollection() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected to MongoDB");

    const result = await Media.deleteMany({});
    console.log(`Cleared ${result.deletedCount} documents from Media collection`);

    console.log("Media collection cleared successfully");
  } catch (error) {
    console.error("Error clearing Media collection:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

clearMediaCollection();