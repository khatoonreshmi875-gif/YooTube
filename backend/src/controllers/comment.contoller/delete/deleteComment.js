import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
import { invalidateVideoComments } from "../../../utils/invalidateAll.js";
import client from "../../../utils/redis.js";

export const deleteComment = asynchandler(async (req, res) => {
  const updateComment = req.resource;
  console.log("upfdated comment", updateComment);
  const commentId = updateComment?._id?.toString();
  console.log("video", commentId);
  const videoId = updateComment?.video?.toString();
  console.log("video", videoId);
  const tweetId = updateComment?.tweet ? updateComment.tweet.toString() : null;
  console.log("video", tweetId);
  await updateComment.deleteOne();
  const result = await Promise.allSettled([
    await invalidateVideoComments(
      `/api/v1/comments/com/${videoId}?page=*:${req.user._id}`,
    ),
    await invalidateVideoComments(
      `api/v1/comments/tweet-comment/${tweetId}?page=*:${req.user._id}`,
    ),

    client.del(`api/v1/comments/comm/${commentId}?page=*:${req.user._id}`),
  ]);
  console.log("res of del comment", result);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Comment deleted successfully"));
});
