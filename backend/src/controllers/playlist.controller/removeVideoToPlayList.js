import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { playlistInvalidate } from "../../utils/playlistInvalidate.js";
import client from "../../utils/redis.js";
export const removeVideoToPlayList = asynchandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  //console.log("playlist Id", playlistId, "video", videoId);
  // console.log(videoId);
  // const video = await Video.findById(videoId);
  // console.log(video);
  // if (!video) {
  //   throw new ApiError(404, "video  is not found");
  // }
  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $pull: {
        videos: videoId,
      },
    },
    {
      new: true,
    },
  );
  if (!updatedPlaylist) {
    throw new ApiError(404, "playlist  is not found");
  }
  await playlistInvalidate(req.user._id, updatedPlaylist.owner, playlistId);
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video deleted to playlist"));
});
