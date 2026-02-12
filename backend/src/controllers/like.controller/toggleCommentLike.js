import asynchandler from "../../utils/asynchandler.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Comment } from "../../models/comments.model.js";
import { toggleLikeHelper } from "../../utils/toggleLikeHelper.js";
import client from "../../utils/redis.js";
import { invalidateVideoComments } from "../../utils/invalidateAll.js";
import { tweetInvalidateLike } from "../../utils/tweetInvalidate.js";

export const toggleCommentLike = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }
  const { existingLike, updatedVariable } = await toggleLikeHelper({
    Id: commentId,
    userId: req.user._id,
    entityKey: "comment",
    Model: Comment,
    likeField: "CommentlikeCount",
    dislikeField: "CommentDislikeCount",
  });
  if (updatedVariable.video) {

    let videoId = updatedVariable.video.toString();
    const result = await Promise.allSettled([
      await invalidateVideoComments(
        `/api/v1/comments/com/${videoId}?page=*:${req.user._id}`,
      ),
    ]);
    if (updatedVariable.parent === null) {
      const result = await invalidateVideoComments(
        `/api/v1/comments/comm/${commentId}?page=*:${updatedVariable.owner.toString()}`,
      );
    } else {
      const result = await invalidateVideoComments(
        `/api/v1/comments/comm/${updatedVariable.parent.toString()}?page=*:${updatedVariable.owner.toString()}`,
      );
    }
  }
  if (updatedVariable.tweet) {
   
    let tweetId = updatedVariable.tweet.toString();
   
    if (updatedVariable.parent === null) {
      const result = await invalidateVideoComments(
        `/api/v1/comments/comm/${commentId}?page=*:${updatedVariable.owner.toString()}`,
      );
    } else {
      const result = await invalidateVideoComments(
        `/api/v1/comments/comm/${updatedVariable.parent.toString()}?page=*:${updatedVariable.owner.toString()}`,
      );
    }

    await tweetInvalidateLike(
      tweetId,
      updatedVariable.owner.toString(),
      req.user._id,
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        Liked: !existingLike,
        updatedComment: updatedVariable,
        RemoveDislike: false,
      },
      "Comment Like status updated",
    ),
  );
});
