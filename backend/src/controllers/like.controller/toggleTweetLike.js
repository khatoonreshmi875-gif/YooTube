import asynchandler from "../../utils/asynchandler.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { toggleLikeHelper } from "../../utils/toggleLikeHelper.js";
import { Tweet } from "../../models/tweet.model.js";
import { tweetInvalidateLike } from "../../utils/tweetInvalidate.js";

export const toggletweetLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  if (!tweetId) {
    throw new ApiError(400, "tweet ID is required");
  }

  const { existingLike, updatedVariable } = await toggleLikeHelper({
    Id: tweetId,
    userId: req.user._id,
    entityKey: "tweet",
    Model: Tweet,
    likeField: "tweetLikeCount",
    dislikeField: "tweetDislikeCount",
  });
  if (!updatedVariable) {
    throw new ApiError(404, "Tweet not found");
  }
 
  await tweetInvalidateLike(
    tweetId,
    updatedVariable.owner.toString(),
    req.user._id,
  );
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        Liked: !existingLike,
        updatedTweet: updatedVariable,
        RemoveDislike: false,
      },
      "Tweet Like status updated",
    ),
  );
});
