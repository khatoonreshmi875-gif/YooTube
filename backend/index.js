import dotenv from "dotenv";

import { connectDB } from "./src/db/index.js";
import http from "http";
import { initSocket } from "./src/utils/socket.js";
import app from "./src/app.js";

dotenv.config({
  path: "./.env",
});
const server = http.createServer(app);
 initSocket(server);
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    server.listen(process.env.PORT, () => {
      console.log("Server running on port 8000");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });
export default app;
// import dotenv from "dotenv";

// import connectDB from "./src/db/index.js";

// import app from "./src/app.js";

// dotenv.config({
//   path: "./.env",
// });

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is  running at port ${process.env.PORT}`);
//     });
//     app.on("error", (error) => {
//       console.error("Something is  wrong ", error);
//     });
//   })
//   .catch((err) => {
//     console.log("MongoDB connection failed!!", err);
//   });
