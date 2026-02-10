import { Tweet } from "../../models/tweet.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getUserTweet = asynchandler(async (req, res) => {
  const { userId } = req.params;
  const tweet = await Tweet.find({ owner: userId })
    .sort({ createdAt: 1 })
    .populate("video")
    .populate({
      path: "owner",
      select: "_id channelName avatar",
    });
  if (!tweet) {
    throw new ApiError(404, "No tweet found for this user");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, tweet, "User's oldest tweet fetched successfully"),
    );
});
