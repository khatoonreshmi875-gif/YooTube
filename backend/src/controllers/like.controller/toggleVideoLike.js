import asynchandler from "../../utils/asynchandler.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { toggleLikeHelper } from "../../utils/toggleLikeHelper.js";
import { Video } from "../../models/video.model.js";
import { videoInvalidate } from "../../utils/videoInvalidate.js";
export const toggleVideoLike = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, " videoID is required");
  }
  const { existingLike, updatedVariable } = await toggleLikeHelper({
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
        Liked: !existingLike,
        updatedVideo: updatedVariable,
        RemoveDislike: false,
      },
      "video Like status updated",
    ),
  );
});
