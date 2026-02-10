import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { videoInvalidate } from "../../utils/videoInvalidate.js";
import { deleteFromCloudinary } from "../../utils/cloudinary.js";
import { deleteFile } from "../../utils/deleteOldFile.js";
import ApiError from "../../utils/ApiError.js";
export const deleteVideo = asynchandler(async (req, res) => {
  const videoId = req.params.videoId;
  const userId = req.user?._id;
  if (!videoId) {
    throw new ApiError(401, "videoId is required");
  }
  // ✅ Check if video exists

  const updatedVideo = await Video.findById(videoId);
  if (!updatedVideo) {
    throw new ApiError(404, "Video not found");
  }
  // ✅ Delete from Cloudinary

  if (updatedVideo?.publicId) {
    await deleteFromCloudinary(updatedVideo?.publicId, "video");
  }
  // ✅ Delete local file if path exists
  // if (updatedVideo.Path) {
  //   await deleteFile(updatedVideo.Path);
  // }
  // if (!updatedVideo.Path) {
  //   throw new ApiError(400, "Local file path missing");
  // }
  // ✅ Delete from MongoDB

  await Video.findByIdAndDelete(videoId);
  await videoInvalidate(videoId, updatedVideo.owner);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video Deleted Successfully"));
});
