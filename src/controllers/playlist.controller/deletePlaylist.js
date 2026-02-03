import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { playlistInvalidate } from "../../utils/playlistInvalidate.js";
import client from "../../utils/redis.js";
export const deletePlayList = asynchandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByIdAndDelete(playlistId);
  await playlistInvalidate(req.user._id, req.user._id, playlistId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "playlist deleted successfully"));
});
