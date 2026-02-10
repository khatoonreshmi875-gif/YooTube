import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { playlistInvalidate } from "../../utils/playlistInvalidate.js";
import client from "../../utils/redis.js";
export const updatePlaylist = asynchandler(async (req, res) => {
  const { playlistId } = req.params;
  const {
    name,
    description,
    category,
    thumbnail: existingThumbnail,
  } = req.body;
  let thumbnailUrl;
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
    thumbnailUrl = thumbnail.url;
    if (!thumbnail.url) {
      throw new ApiError(500, "thumbnail upload to Cloudinary failed");
    }
  } else {
    thumbnailUrl: existingThumbnail;
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, {
    $set: {
      name,
      description,
      category,
      thumbnail: thumbnailUrl,
    },
  });
  await playlistInvalidate(req.user._id, updatedPlaylist.owner);
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPlaylist, "playlist updated successfully"),
    );
});
