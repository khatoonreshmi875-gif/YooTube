import { Comment } from "../../../../models/comments.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { invalidateVideoComments } from "../../../../utils/invalidateAll.js";
import client from "../../../../utils/redis.js";

export const replyComment = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const parentComment = await Comment.findById(commentId)
    .select("video")
    .lean();
  const reply = await Comment.create({
    content,

    video: parentComment.video,
    parent: commentId,
    owner: req.user._id,
  });
  const comment = reply.toObject();

  const updateComment = await Comment.findByIdAndUpdate(commentId, {
    $inc: {
      ReplyCount: 1,
    },
  });
  const value = await client.exists(
    `/api/v1/comments/comm/${commentId}?page=0:69221a6f1d952de980dc5f53`,
  );
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
      `/api/v1/comments/comm/${commentId}?page=*:${req.user._id}`,
    ),
    await invalidateVideoComments(
      `/api/v1/comments/tweet-comment/${tweetId}?page=*:${req.user._id}`,
    ),
  ]);
  return res
    .status(200)
    .json(new ApiResponse(201, comment, "Comment reply created successfully"));
});
