import client from "./redis.js";

export const playlistInvalidate = async (userId, playlistOwner, playlistId) => {
  console.log("userId", userId, playlistOwner);
  const res = await Promise.allSettled([
    client.del(`/api/v1/playlists/user-playlist:${userId}`),
    client.del(`/api/v1/playlists/user-playlist/${playlistOwner}`),
    client.del(`/api/v1/playlists/all-playlist:${userId}`),
    client.del(`/api/v1/playlists/playlist-video/${playlistId}:${userId}`),
  ]);
  console.log("res of playlist", res);
};
