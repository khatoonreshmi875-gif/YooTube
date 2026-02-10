// config/redis.js
// import redis from "redis";

// const client = redis.createClient({
//   socket: {
//     host: "localhost", // WSL2 Redis instance
//     port: 6379, // default Redis port
//   },
// });

// // Handle errors
// client.on("error", (err) => {
//   console.error("Redis error:", err);
// });

// // Connect once when the app starts
// async function connectRedis() {
//   try {
//     await client.connect();
//     console.log("Connected to Redis!");
//   } catch (err) {
//     console.error("Redis connection failed:", err);
//   }
// }

// connectRedis();

// export default client;
import Redis from "ioredis";

let client;

if (process.env.NODE_ENV === "production") {
  // On Vercel: use hosted Redis (Upstash, Redis Cloud, etc.)
  client = new Redis(process.env.REDIS_URL);
} else {
  // Local development: connect to WSL2 Redis
  client = new Redis({
    host: "localhost",
    port: 6379,
  });
}

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis!");
});

export default client;