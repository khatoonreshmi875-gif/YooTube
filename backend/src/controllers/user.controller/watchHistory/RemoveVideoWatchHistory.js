import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
import client from "../../../utils/redis.js";
export const RemoveVideoWatchHistory = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: {
        watchHistory: {
          videoId: videoId,
        },
      },
    },
    { new: true },
  );

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }
  const result = await Promise.allSettled([
    client.del(`/api/v1/users/history:${req.user._id}`),
    client.del(`/api/v1/users/curr-user:${req.user._id}`),
    client.del(`/api/v1/users/curr-user-by-id/${req.user._id}`),
    client.del(`/api/v1/videos/get-reccomended-video:${req.user._id}`),
  ]);
  console.log(result);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.watchHistory,
        "Removed video from watch history",
      ),
    );
});
