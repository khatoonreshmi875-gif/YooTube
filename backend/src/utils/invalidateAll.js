import Redis from "ioredis";
import client from "./redis.js";

export async function invalidateVideoComments(pattern) {
  // Match both normal and paginated keys

  const stream = client.scanStream({
    match: pattern,
    count: 100, // batch size
  });

  stream.on("data", async (keys) => {
    if (keys.length) {
      console.log("Deleting keys:", keys);
      await client.del(...keys);
    }
  });

  stream.on("end", () => {
    console.log("✅ Finished deleting all video comment keys");
  });
}
