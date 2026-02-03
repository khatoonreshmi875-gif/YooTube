import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import client from "../../utils/redis.js";
export const clearAllWatchhistory = asynchandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, {
    $set: {
      watchHistory: [],
    },
  });
  await Promise.allSettled([
    client.del(`/api/v1/users/history:${req.user._id}`),
    client.del(`/api/v1/users/curr-user:${req.user._id}`),
    client.del(`/api/v1/users/curr-user-by-id/${req.user._id}`),
    client.del(`/api/v1/videos/get-reccomended-video:${req.user._id}`),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, [], "clear all watch history"));
});
1;
