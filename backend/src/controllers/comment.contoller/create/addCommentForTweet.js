import { Comment } from "../../../models/comments.model.js";
import ApiError from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
import { invalidateVideoComments } from "../../../utils/invalidateAll.js";
import client from "../../../utils/redis.js";
export const addCommentForTweet = asynchandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  const newComment = await Comment.create(
    { content, tweet: tweetId, owner: req.user._id },
    // faster writes
  );

  const comment = newComment.toObject();
  await invalidateVideoComments(
    `/api/v1/comments/tweet-comment/${tweetId}?page=*:${req.user._id}`,
  );

  return res.status(200).json(new ApiResponse(201, comment, "Comment added"));
});
