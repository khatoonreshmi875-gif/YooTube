import Redis from "ioredis";

// Always connect to Upstash Redis using the URL
// Make sure REDIS_URL is set in your environment variables
const client = new Redis(process.env.REDIS_URL, {
  tls: {}, // Upstash requires TLS/SSL
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.on("connect", () => {
  console.log("Connected to Upstash Redis!");
});

export default client;