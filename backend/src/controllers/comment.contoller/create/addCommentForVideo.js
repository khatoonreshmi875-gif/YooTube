import { Comment } from "../../../models/comments.model.js";
import ApiError from "../../../utils/ApiError.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
import { invalidateVideoComments } from "../../../utils/invalidateAll.js";
import client from "../../../utils/redis.js";
export const addComment = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Content is required");
  }

  const newComment = await Comment.create(
    { content, video: videoId, owner: req.user._id },
    // faster writes
  );

  const comment = await Comment.findById(newComment._id).populate(
    "owner",
    "channelName avatar",
  );

  await Promise.allSettled([
    await invalidateVideoComments(
      `/api/v1/comments/com/${videoId}?page=*:${req.user._id}`,
    ),
  ]);

  return res.status(200).json(new ApiResponse(201, comment, "Comment added"));
});
