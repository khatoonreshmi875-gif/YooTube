// import dotenv from "dotenv";

// import connectDB from "./src/db/index.js";

// import app from "./src/app.js";

// dotenv.config({
//   path: "./.env",
// });

// connectDB()
//   .then(() => {
//     console.log("MongoDB connected successfully");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection failed!!", err);
//   });
// // export default app;
import dotenv from "dotenv";

import connectDB from "./src/db/index.js";

import app from "./src/app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is  running at port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.error("Something is  wrong ", error);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });
