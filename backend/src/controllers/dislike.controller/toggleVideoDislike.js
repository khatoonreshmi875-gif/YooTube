import { Video } from "../../models/video.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { toggleDislikeHelper } from "../../utils/toggleDislikeHelper.js";
import { videoInvalidate } from "../../utils/videoInvalidate.js";
export const toggleVideoDisLike = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Comment ID is required");
  }
  const { existingDislike, updatedVariable } = await toggleDislikeHelper({
    Id: videoId,
    userId: req.user._id,
    entityKey: "video",
    Model: Video,
    likeField: "videoLikeCount",
    dislikeField: "videoDislikeCount",
  });

  await videoInvalidate(videoId, req.user._id, req.user._id);
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        dislike: !existingDislike,

        updatedVideo: updatedVariable,
        likeRemoved: false,
      },
      "Comment Like status updated",
    ),
  );
});
