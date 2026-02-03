import { Playlist } from "../models/playlists.model.js";
import { Tweet } from "../models/tweet.model.js";
import client from "./redis.js";
import { invalidateVideoComments } from "./invalidateAll.js";

export const videoInvalidate = async (videoId, userId, id) => {
  const tweetsWithVideo = await Tweet.find({ video: videoId }).select("_id");
  const tweetTasks = tweetsWithVideo.map((t) =>
    client.del(`/api/v1/tweets/c/${t._id}`),
  );
  const playlistWithVideo = await Playlist.find({ video: videoId }).select(
    "_id",
  );
  const playlistTask = playlistWithVideo.map((t) =>
    client.del(`/api/v1/playlists/playlist-video/${t._id}`),
  );

  const result = await Promise.all([
    ...tweetTasks,
    ...playlistTask,
    client.del(`/api/v1/videos/user/get-all-videos/${userId}:${id}`),

    invalidateVideoComments(`/api/v1/videos/user-id/${userId}?page=*:${id}`),
    client.del(`/api/v1/videos/vid/${videoId}:${id}`),
    client.del(`/api/v1/videos/state-video-like/${videoId}:${id}`),
    client.del(`/api/v1/videos/rec-video/${videoId}?page=*:${id}`),
    client.del(`/api/v1/videos/download/${videoId}:${id}`),
    client.del(`/api/v1/videos/upload-video:${id}`),
    client.del(`/api/v1/videos/id/${videoId}/user/${userId}`),
    client.del(`/api/v1/subscriptions/search-channel:${id}`),
    client.del(`/api/v1/videos/get-reccomended-video?*`),
    client.del(`/api/v1/videos/user/get-all-videos?page=*:${id}`),
    client.del(`/api/v1/likes/liked-videos:${id}`),

    client.del(`/api/v1/playlists/user-playlist:${id}`),
    client.del(`/api/v1/playlists/user-playlist/${userId}:${id}`),

    client.del(`/api/v1/playlists/all-playlist:${id}`),

    client.del(`/api/v1/tweets/tweets-page/${userId}:${id}`),
    client.del(`/api/v1/tweets/subscriber-tweet:${id}`),
  ]);
  console.log("results of vidoe invalidate", result);
};

export const publishVideoInvalidate = async (videoId, userId) => {
  await Promise.allSettled([
    client.del(`/api/v1/videos/user/get-all-videos:${id}`),
    client.del(`/api/v1/videos/user/get-all-videos/${userId}:${id}`),
    client.del(`/api/v1/videos/rec-video/${videoId}?*`),
    client.del(`/api/v1/videos/user-id/${userId}?*`),
    client.del(`/api/v1/videos/get-reccomended-video?*`),
    client.del(`/api/v1/videos/id/${videoId}/user/${userId}:${id}`),
  ]);
};
