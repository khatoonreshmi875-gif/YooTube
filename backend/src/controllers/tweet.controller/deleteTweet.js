import { Tweet } from "../../models/tweet.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { tweetInvalidate } from "../../utils/tweetInvalidate.js";
export const deleteTweet = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  //console.log(tweetId);
  if (!tweetId) {
    throw new ApiError(400, "tweetId isrequired");
  }
  const tweet = await Tweet.findByIdAndDelete(tweetId);
  await tweetInvalidate(tweetId, req.user._id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "tweet deleted successfully"));
});
