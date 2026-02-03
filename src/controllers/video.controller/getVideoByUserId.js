import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";

export const getVideoByUserid = asynchandler(async (req, res) => {
  const { page = 0 } = req.query;
  const userId = req.user?._id || req.params.user;
  if (!userId) {
    throw new ApiError(400, "UserId is required");
  }
  const videos = await Video.find({ owner: userId })
    .populate({
      path: "owner",
      select: "_id",
    })
    .limit(15)
    .skip(Number(page) * 15);

  if (videos.length === 0) {
    throw new ApiError(404, "Video not found");
  }
  console.log("videos", videos);
  //console.log("video", videos);
  return res
    .status(200)
    .json(new ApiResponse(200, { videos }, "video fetched successfully"));
});
