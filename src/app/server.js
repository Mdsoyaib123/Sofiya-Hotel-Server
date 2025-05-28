import mongoose from "mongoose";
import Config from "./Config/index.js";
import { App } from "./app.js";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(Config.db_url);
    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

// Vercel handler
export default async function handler(req, res) {
  await connectDB();
  return App(req, res);
}

// Local server logic (only runs when file is executed directly)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    App.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
}

