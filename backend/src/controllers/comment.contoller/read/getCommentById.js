import { Comment } from "../../../models/comments.model.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import asynchandler from "../../../utils/asynchandler.js";
export const getCommentById = asynchandler(async (req, res) => {
  const { commentId } = req.params;
  console.log("cometnId", commentId);
  if (!commentId) {
    console.log("commentId is not defined");
  }
  const comment = await Comment.findById(commentId)

    .lean();

  if (!comment) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Comment not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment fetched successfully"));
});
