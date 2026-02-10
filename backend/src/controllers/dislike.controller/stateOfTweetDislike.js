import asynchandler from "../../utils/asynchandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Dislike } from "../../models/dislike.model.js";
export const stateOfTweetDisLike = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const dislike = await Dislike.findOne({ tweet: tweetId });
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
  res
    .status(200)
    .json(
      new ApiResponse(200, { isTweetdisLike: true }, `tweet  dislike found`),
    );
});
