import { Dislike } from "../../models/dislike.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const stateOfTweetDisLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id; // assuming you attach user to reqdislikedBy

  const dislike = await Dislike.findOne({
    tweet: tweetId,
    dislikedBy: userId,
  });

  if (!dislike) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isTweetdisLike: false },
          "no tweet dislike is found",
        ),
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { isTweetdisLike: true }, "tweet dislike found"),
    );
});
