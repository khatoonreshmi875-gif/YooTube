import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";

export const getVideoUserid = asynchandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    throw new ApiError(400, "UserId is required");
  }
  const videos = await Video.find({ owner: userId }).populate({
    path: "owner",
    select: "_id",
  });

  if (!videos) {
    throw new ApiError(404, "Video not found");
  }

  //console.log("video", videos);

  return res
    .status(200)
    .json(new ApiResponse(200, { videos }, "video fetched successfully"));
});
