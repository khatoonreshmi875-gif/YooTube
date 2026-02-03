import client from "../utils/redis.js";

async function cacheMiddleware(req, res, next) {
  const userId = req.user._id;
  const queryString = new URLSearchParams(req.query).toString();
  const keys = queryString
    ? `${req.baseUrl}${req.path}?${queryString}`
    : `${req.baseUrl}${req.path}`;

  const lastSegment = keys.split("/").at(-1);
  let key;
  if (lastSegment === req.user._id) {
    key = keys;
  } else {
    key = `${keys}:${userId}`;
  }
  // unique per route + query
  console.log("data  ✅ r", key, lastSegment);
  console.log("Cache key:", key);

  try {
    const start = Date.now();
    const data = await client.get(key);

    if (data) {
      console.log("✅ Redis HIT in", Date.now() - start, "ms");
      return res.json(JSON.parse(data));
    }

    console.log("❌ Redis MISS in", Date.now() - start, "ms");

    // Cache miss → override res.json
    const originalJson = res.json.bind(res);
    res.json = async (body) => {
      try {
        await client.setEx(key, 3600, JSON.stringify(body)); // cache for 1h
      } catch (err) {
        console.error("Redis set error:", err);
      }
      return originalJson(body);
    };

    next();
  } catch (err) {
    console.error("Redis get error:", err);
    next(); // continue without cache
  }
}

export default cacheMiddleware;
