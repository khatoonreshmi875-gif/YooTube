import Redis from "ioredis";
const redis = new Redis();

export async function invalidateVideoComments(pattern) {
  // Match both normal and paginated keys

  const stream = redis.scanStream({
    match: pattern,
    count: 100, // batch size
  });

  stream.on("data", async (keys) => {
    if (keys.length) {
      console.log("Deleting keys:", keys);
      await redis.del(...keys);
    }
  });

  stream.on("end", () => {
    console.log("✅ Finished deleting all video comment keys");
  });
}
