import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getPlayListById = asynchandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(400, "playlist ID is required");
  }

  const playlist = await Playlist.findById(playlistId)
    .populate("videos")
    .populate({ path: "owner", select: "avatar channelName _id" });
  if (!playlist) {
    throw new ApiError(404, "playlist  is not found");
  }

  const totalViews = Array.isArray(playlist.videos)
    ? playlist.videos.reduce((sum, video) => sum + (video.views || 0), 0)
    : 0;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { playlist, totalViews },
        "Playlist fetched successfully",
      ),
    );
});
