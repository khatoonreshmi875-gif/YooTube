import asynchandler from "../../utils/asynchandler.js";

import { ApiResponse } from "../../utils/ApiResponse.js";
import { Like } from "../../models/likes.model.js";
export const stateOfTweetLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;
  const like = await Like.findOne({ tweet: tweetId, likedBy: userId });

  if (!like) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { isTweetLike: false }, "no tweet like found"),
      );
  }
  res
    .status(200)
    .json(new ApiResponse(200, { isTweetLike: true }, `tweet is liked`));
});
