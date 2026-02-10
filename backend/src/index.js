import dotenv from "dotenv";

import connectDB from "./db/index.js";

import app from "./app.js";

dotenv.config({
  path: "./.env",
  quiet: true,
});

// Connect DB before exporting
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!", err);
  });

// ✅ Export app for Vercel (no app.listen here)
export default app;
