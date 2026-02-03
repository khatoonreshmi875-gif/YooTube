import { Video } from "../../models/video.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { videoInvalidate } from "../../utils/videoInvalidate.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
export const updateVideo = asynchandler(async (req, res) => {
  const { videoId } = req.params; //// get video ID from URL

  if (!videoId) {
    throw new ApiError(401, "videoId is required");
  }
  //get title and description and validate fields

  const { title, description, thumbnail: existingThumbnail } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "Title and description are required");
  }
  console.log("thumbnail", existingThumbnail, "or ");
  let thumbnailUrl;
  //get video file and thumbnail path
  if (req.file) {
    const thumbnailFilePath = req.file?.path;
    console.log("thumbnail", thumbnailFilePath);
    // check video path and thumbnail path
    if (!req.file) {
      console.log("No thumbnail uploaded");
    } else {
      console.log("Thumbnail path:", req.file.path);
    }

    if (!thumbnailFilePath) {
      throw new ApiError(400, "thumbnail file path is missing");
    }

    //upload on cloudinary
    const thumbnail = await uploadOnCloudinary(thumbnailFilePath);

    //check video upload and thumbnail upload
    if (!thumbnail.url) {
      throw new ApiError(500, "thumbnail upload to Cloudinary failed");
    }
    thumbnailUrl = thumbnail.url;
  } else {
    thumbnailUrl = existingThumbnail;
    if (!thumbnailUrl) {
      throw new ApiError(400, "thumbnail is required");
    }
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        thumbnail: thumbnailUrl,
        title,
        description,
      },
    },
    { new: true },
  );
  if (!updatedVideo) {
    throw new ApiError(404, "Video not found");
  }
  await videoInvalidate(videoId, updatedVideo.owner, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});
