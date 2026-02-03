import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
export const createPlayList = asynchandler(async (req, res) => {
  const { name, description, category } = req.body || {};
  if ([name, description, category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  //console.log(req.body);
  const thumbnailFilePath = req.file?.path;
  //console.log("thumbnail", thumbnailFilePath);
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

  if (!thumbnail) {
    throw new ApiError(500, "thumbnail upload to Cloudinary failed");
  }

  const newPlaylist = await Playlist.create({
    name,
    description,
    category,
    createdAt: new Date(),
    owner: req.user?._id,
    thumbnail: thumbnail.url || null,
  });
  // invalidateCache(`/user-playlist/${updatePlaylist.owner}`);
  // invalidateCache(`/user-playlist`);
  return res
    .status(200)
    .json(new ApiResponse(201, newPlaylist, "Playlist created successfully"));
});
