import asynchandler from "../../utils/asynchandler.js";

import ApiError from "../../utils/ApiError.js";
import { Video } from "../../models/video.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { publishVideoInvalidate } from "../../utils/videoInvalidate.js";

const publishAVideo = asynchandler(async (req, res) => {
  //get title and description and validate fields
  const { title, description, tags, category } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "Title and description are required");
  }

  //get uploaded video file and thumbnail file

  const videofile = req.files?.videofile?.[0];
  const thumbnailFile = req.files?.thumbnail?.[0];
  console.log("videofile", videofile);
  console.log("thumbnail", thumbnailFile);

  //get file path of video and thumbnail
  const videofilePath = videofile?.path;
  const thumbnailFilePath = thumbnailFile?.path;

  //check video file and thumbnail path
  if (!videofilePath) {
    throw new ApiError(400, "VideoFilePath is required");
  }
  if (!thumbnailFilePath) {
    throw new ApiError(400, "thumbnailFilePath is required");
  }

  //video and thumbnail upload on cloudinary
  const [video, thumbnail] = await Promise.all([
    uploadOnCloudinary(videofilePath),
    uploadOnCloudinary(thumbnailFilePath, "video"),
  ]);

  //check check video and thumbnail upload result

  if (!video) {
    console.log("video url is not found");
  }

  if (!thumbnail) {
    console.log("thumbnail.url is not found");
  }
  console.log("upload result data.;;;;;;;;;;;;;;;;", video);
  //
  // create new video document in DB
  const newVideo = await Video.create({
    title,
    description,
    videoFile: video.uploadResult.secure_url,
    thumbnail: thumbnail.url,
    duration: video.uploadResult.duration,
    publicId: video.uploadResult.public_id,
    owner: req.user?._id,
    tags,
    category,
  });

  const videoData = newVideo.toObject();
  res
    .status(201)
    .json(new ApiResponse(201, videoData, "Video uploaded successfully"));
  await publishVideoInvalidate(newVideo?._id, req.user._id)
    .then(() => console.log("cache invalidated"))
    .catch((err) => console.error("cache invalidation failed ", err));
});
export { publishAVideo };
