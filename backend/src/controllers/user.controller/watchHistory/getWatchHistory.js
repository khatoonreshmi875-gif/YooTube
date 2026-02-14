import { User } from "../../../models/user.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getWatchHistory = asynchandler(async (req, res) => {
  const { frontendId } = req.query;

  const user = await User.findById(req.user._id)
    .populate({
      path: "watchHistory",
      match: frontendId ? { _id: { $lt: frontendId } } : {},
      options: { sort: { _id: 1 }, limit: 5 },
      populate: {
        path: "videoId",
        select: "title thumbnail publicId description views duration _id",
        populate: {
          path: "owner",
          select: "avatar channelName",
        }, // populate the owner inside each video
      },
    })
    .select("watchHistory");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Watch history fetched successfully"));
});
