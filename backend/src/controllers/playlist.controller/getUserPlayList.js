import { Playlist } from "../../models/playlists.model.js";
import { Video } from "../../models/video.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import client from "../../utils/redis.js";
export const getUserPlayList = asynchandler(async (req, res) => {
  const userId = req.user?._id || req.params.userId;
  if (!userId) {
    throw new ApiError(400, "user ID is required");
  }
  const playlist = await Playlist.find({ owner: userId }).populate("videos");
  if (!playlist) {
    throw new ApiError(404, "playlist  is not found");
  }
  const playlistsWithViews = playlist.map((playlist) => {
    const totalViews = playlist.videos.reduce(
      (sum, video) => sum + (video.views || 0),
      0,
    );
    return { ...playlist.toObject(), totalViews };
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, playlistsWithViews, "Playlist fetched successfully"),
    );
});
