import dotenv from "dotenv";

import connectDB from "./db/index.js";

import app from "./app.js";

dotenv.config({
  path: "./env",
  quiet: true,
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is  running at port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.error("Something is  wrong ", error);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });
