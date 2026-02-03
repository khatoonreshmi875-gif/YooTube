import asynchandler from "../../utils/asynchandler.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Tweet } from "../../models/tweet.model.js";
import { toggleDislikeHelper } from "../../utils/toggleDislikeHelper.js";
import {
  tweetInvalidate,
  tweetInvalidateLike,
} from "../../utils/tweetInvalidate.js";
export const toggleTweetDisLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "tweet ID is required");
  }
  const { existingDislike, updatedVariable } = await toggleDislikeHelper({
    Id: tweetId,
    userId: req.user._id,
    entityKey: "tweet",
    Model: Tweet,
    likeField: "tweetLikeCount",
    dislikeField: "tweetDislikeCount",
  });

  await tweetInvalidateLike(
    tweetId,
    updatedVariable.owner.toString(),
    req.user._id,
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        dislike: !existingDislike,

        updatedTweet: updatedVariable,
        likeRemoved: false,
      },
      "Tweet Like status updated",
    ),
  );
});
