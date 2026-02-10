import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
export const getAllPlaylist = asynchandler(async (req, res) => {
  const playlist = await Playlist.find()
    .populate("videos")
    .sort("views")
    .populate({ path: "owner", select: "avatar channelName _id" });
  const playlistsWithViews = playlist.map((p) => {
    const totalViews = p.videos.reduce((sum, video) => {
      return sum + (video.views || 0);
    }, 0);

    return {
      ...p.toObject(),
      totalViews,
    };
  });

  if (!playlist) {
    throw new ApiError(404, "playlist  is not found");
  }
  const sortedPlaylists = playlistsWithViews.sort((a, b) => {
    if (b.totalViews !== a.totalViews) {
      return b.totalViews - a.totalViews; // more views first
    }
    return new Date(b.createdAt) - new Date(a.createdAt); // newest first
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { sortedPlaylists },
        "Playlist fetched successfully",
      ),
    );
});
