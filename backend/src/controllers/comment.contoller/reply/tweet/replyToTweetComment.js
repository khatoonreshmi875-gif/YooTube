import { Comment } from "../../../../models/comments.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
import { invalidateVideoComments } from "../../../../utils/invalidateAll.js";
export const replyCommentForTweet = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  const comments = await Comment.findById(commentId)

    .lean();

  if (!comments) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Parent comment not found"));
  }

  const reply = await Comment.create({
    content,
    tweet: comments.tweet,
    parent: commentId,
    owner: req.user._id,
  });
  const comment = reply.toObject();

  const updateComment = await Comment.findByIdAndUpdate(commentId, {
    $inc: {
      ReplyCount: 1,
    },
  });
  Promise.all([
    await invalidateVideoComments(
      `/api/v1/comments/tweet-comment/${updateComment.tweet.toString()}?page=*:${req.user._id}`,
    ),
    await invalidateVideoComments(
      `/api/v1/comments/comm/${commentId}?page=*:${updateComment.owner.toString()}`,
    ),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(201, comment, "Comment reply created successfully"));
});
