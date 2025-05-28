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

const PORT = process.env.PORT || 3000;

// Always run server in Render and local dev
connectDB().then(() => {
  App.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
