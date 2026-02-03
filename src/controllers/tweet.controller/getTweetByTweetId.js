import { Tweet } from "../../models/tweet.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getTweetByTweetId = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const tweet = await Tweet.findById(tweetId)
    .sort({ createdAt: 1 })
    .populate({
      path: "owner",
      select: "channelName avatar _id",
    })
    .populate({
      path: "video",
      select: "videoFile ",
    });

  if (!tweet) {
    throw new ApiError(404, "No tweet found for id");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, tweet, "tweet found using tweet id"));
});
