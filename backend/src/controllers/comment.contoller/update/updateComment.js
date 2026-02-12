import { Comment } from "../../../models/comments.model.js";
import ApiError from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
import client from "../../../utils/redis.js";
import { invalidateVideoComments } from "../../../utils/invalidateAll.js";
export const updateComment = asynchandler(async (req, res) => {
  const { content } = req.body;
  const commentData = req.resource;
  if (!content) {
    throw new ApiError(400, "commentId and content are required");
  }
  const commentId = commentData._id.toString();
  const updateComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    },
  ).lean();

  const videoId = updateComment.video.toString();
  const tweetId =
    updateComment.tweet !== null
      ? updateComment.tweet.toString()
      : updateComment.tweet;
  const result = await Promise.allSettled([
    await invalidateVideoComments(
      `/api/v1/comments/com/${videoId}?page=*:${req.user._id}`,
    ),
    await invalidateVideoComments(
      `/api/v1/comments/tweet-comment/${tweetId}?page=*:${req.user._id}`,
    ),

    await invalidateVideoComments(
      `/api/v1/comments/comm/${commentId}?page=*:${req.user._id}`,
    ),
  ]);
  if (!updateComment) {
    throw new ApiError(404, "Comment not found");
  }
 
  return res
    .status(200)
    .json(new ApiResponse(200, updateComment, "Comment updated successfully"));
});
