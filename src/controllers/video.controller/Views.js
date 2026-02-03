import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { videoInvalidate } from "../../utils/videoInvalidate.js";

export const Views = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    },
  );

  await videoInvalidate(videoId, updatedVideo.owner, req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, { updatedVideo }, "View increase successfully"));
});
