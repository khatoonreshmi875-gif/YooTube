import { Tweet } from "../../models/tweet.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { tweetInvalidate } from "../../utils/tweetInvalidate.js";
export const updateTweet = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;
  if (!content) {
    throw new ApiError(400, "content is required");
  }
  const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, {
    $set: {
      content,
      image: image.url || null,
    },
  });

  await tweetInvalidate(tweetId, req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "tweet updated successfully"));
});
