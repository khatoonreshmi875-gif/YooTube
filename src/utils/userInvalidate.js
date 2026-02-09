import { Comment } from "../models/comments.model.js";
import { Playlist } from "../models/playlists.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Video } from "../models/video.model.js";
import { invalidateVideoComments } from "./invalidateAll.js";
import client from "./redis.js";

export const userInvalidate = async (ownerId) => {
  const videos = await Video.find({ owner: ownerId }).select("_id");

  const videoTasks = videos
    .map((v) => [
      invalidateVideoComments(
        `/api/v1/videos/rec-video/${v._id}?page=*:${ownerId}`,
      ),
      client.del(`/api/v1/videos/vid/${v._id}`),
      client.del(`/api/v1/videos/download-video/${v._id}:${ownerId}`),
      invalidateVideoComments(
        `/api/v1/comments/com/${v._id}?page=*:${ownerId}`,
      ),
    ])
    .flat();

  const playlists = await Playlist.find({ owner: ownerId }).select("_id");
  const playlistTasks = playlists.map((p) =>
    client.del(`/api/v1/playlists/playlist-video/${p._id}`),
  );
  const tweets = await Tweet.find({ owner: ownerId }).select("_id");

  const tweetTasks = tweets.map((m) => {
    console.log(m);
    return [
      invalidateVideoComments(
        `/api/v1/comments/tweet-comment/${m._id}?page=*:${ownerId}`,
      ),
      client.del(`/api/v1/tweets/c/${m._id}`),
      client.del(`/api/v1/dislikes/state-tweet-dislike/${m._id}`),
    ];
  });
  const comments = await Comment.find({ owner: ownerId }).select("_id");
  const commentTasks = comments.map((d) =>
    invalidateVideoComments(`api/v1/comments/comm/${d._id}?page=*:${ownerId}`),
  );

  await Promise.allSettled([
    ...videoTasks,
    ...playlistTasks,
    ...tweetTasks,
    ...commentTasks,
    client.del(`/api/v1/users/curr-user-by-id/${ownerId}`),
    invalidateVideoComments(`/api/v1/users/history/?page=*:${ownerId}`),
    client.del(`/api/v1/users/curr-user:${ownerId}`),
    client.del(`/api/v1/users/all-user:${ownerId}`),
    client.del(`/api/v1/users/role-moderator:${ownerId}`),
    client.del(`/api/v1/users/role-user:${ownerId}`),

    invalidateVideoComments(`/api/v1/videos/user-id/${ownerId}?page=*:${ownerId}`),
    client.del(`/api/v1/users/role-user:${ownerId}`),

    invalidateVideoComments(
      `/api/v1/videos/user-id/${ownerId}?page=*:${ownerId}`,
    ),

    client.del(`/api/v1/videos/upload-video:${ownerId}`),
    invalidateVideoComments(
      `/api/v1/videos/user/get-all-videos?page=*:${ownerId}`,
    ),
    client.del(`/api/v1/likes/liked-videos:${ownerId}`),

    invalidateVideoComments(
      `/api/v1/tweets/subscriber-tweet?page=*:${ownerId}`,
    ),
    client.del(`/api/v1/playlists/all-playlist:${ownerId}`),
    client.del(`/api/v1/playlists/user-playlist:${ownerId}`),
    client.del(`/api/v1/playlists/user-playlist/${ownerId}`),
    client.del(`/api/v1/tweets/tweet-page/${ownerId}`),
    invalidateVideoComments(
      `/api/v1/tweets/subscriber-tweet?page=*:${ownerId}`,
    ),
    client.del(`/api/v1/reports/report:${ownerId}`),
    client.del(`/api/v1/reports/report-by-date:${ownerId}`),
    client.del(`/api/v1/subscription/c/get-subscriber:${ownerId}`),
    client.del(`/api/v1/subscription/stats:${ownerId}`),
    client.del(`/api/v1/subscription/pre-stats:${ownerId}`),
    client.del(`/api/v1/subscription/subscribe-btn/${ownerId}`),
  ]);
};
