import { Playlist } from "../../models/playlists.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { playlistInvalidate } from "../../utils/playlistInvalidate.js";
export const deletePlayList = asynchandler(async (req, res) => {
  const { playlistId } = req.params;
  const deleted = await Playlist.findByIdAndDelete(playlistId);
  if (!deleted) throw new ApiError(404, "Playlist not found");

  await playlistInvalidate(req.user._id, req.user._id, playlistId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "playlist deleted successfully"));
});
