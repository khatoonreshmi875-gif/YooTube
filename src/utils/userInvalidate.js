import { Comment } from "../models/comments.model.js";
import { Tweet } from "../models/tweet.model.js";
import { Video } from "../models/video.model.js";

export const userInvalidate = async (ownerId) => {
  const videos = await Video.find({ owner: ownerId }).select("_id");

  const videoTasks = videos
    .map((v) => [
      client.del(`/api/v1/videos/id/${v._id}/user/${ownerId}`),
      client.del(`/api/v1/videos/vid/${v._id}`),

      client.del(`/api/v1/comments/com/${v._id}?*`),
    ])
    .flat();
  const playlists = await Playlist.find({ owner: ownerId }).select("_id");
  const playlistTasks = playlists.map((m) =>
    client.del(`/api/v1/playlists/playlist-video/${m._id}`),
  );
  const tweets = await Tweet.find({ owner: ownerId }).select("_id");
  const tweetTasks = tweets.map(
    (m) => client.del(`api/v1/comments/tweet-comment/${m._id}`),
    client.del(`/api/v1/tweets/c/${m._id}`),
  );
  const comments = await Comment.find({ owner: ownerId }).select("_id");
  const commentTasks = comments.map((m) =>
    client.del(`/api/v1/comments/comm/${m._id}`),
  );

  await Promise.allSettled([
    ...videoTasks,
    ...playlistTasks,
    ...tweetTasks,
    ...commentTasks,
    client.del(`/api/v1/users/curr-user-by-id/${ownerId}`),
    client.del(`/api/v1/users/curr-user:${ownerId}`),
    client.del(`/api/v1/subscriptions/search-channel:${ownerId}`),
    client.del(`/api/v1/videos/get-reccomended-video:${ownerId}`),
    client.del(`/api/v1/videos/user-id/${ownerId}?`),
    client.del(`/api/v1/videos/user/get-all-videos/${ownerId}`),
    client.del(`/api/v1/videos/upload-video:${ownerId}`),
    client.del(`/api/v1/videos/get-reccomended-video:${ownerId}`),
    client.del(`/api/v1/videos/user/get-all-videos:${ownerId}`),
    client.del(`/api/v1/tweets/subscriber-tweet:${ownerId}`),
    client.del(`/api/v1/playlists/all-playlist:${ownerId}`),
  ]);
};
