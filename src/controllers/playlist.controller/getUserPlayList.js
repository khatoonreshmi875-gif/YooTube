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
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlayList = asynchandler(async (req, res) => {
  const { playlistId } = req.params;
  const { videoIds } = req.body;
  const video = await Video.find({ _id: { $in: videoIds } });
  if (!video) {
    throw new ApiError(404, "video  is not found");
  }
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $addToSet: {
        videos: { $each: videoIds },
      },
    },
    {
      new: true,
    },
  );
  if (!updatedPlaylist) {
    throw new ApiError(404, "playlist  is not found");
  }
  await Promise.allSettled([
    client.del(`/api/v1/playlists/user-playlist`),
    client.del(`/api/v1/playlists/user-playlist/${updatePlaylist.owner}`),
    client.del(`/api/v1/playlists/all-playlist`),
    client.del(`/api/v1/playlists/playlist-video/${playlistId}`),
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video added to playlist"));
});
