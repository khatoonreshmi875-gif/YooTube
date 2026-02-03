import { invalidateVideoComments } from "./invalidateAll.js";
import client from "./redis.js";

export const tweetInvalidate = async (tweetId, ownerId) => {
  const res = await Promise.allSettled([
    invalidateVideoComments(
      `/api/v1/tweets/subscriber-tweet?page=*:${ownerId}`,
    ),
    client.del(`/api/v1/tweets/tweets-page/${ownerId}`),
    client.del(`/api/v1/dislikes/state-tweet-dislike/${tweetId}:${ownerId}`),
    client.del(`/api/v1/likes/state-tweet-like/${tweetId}:${ownerId}`),
    client.del(`/api/v1/users/history:${ownerId}`),
    client.del(`/api/v1/users/curr-user-by-id/${ownerId}`),
  ]);
  console.log("res of tweet invalidate", res);
};
export const tweetInvalidateLike = async (tweetId, ownerId, userId) => {
  console.log("ownerId", "userId", ownerId, userId);
  const res = await Promise.allSettled([
    invalidateVideoComments(
      `/api/v1/tweets/subscriber-tweet?page=*:${ownerId}`,
    ),
    invalidateVideoComments(
      `/api/v1/comments/tweet-comment/${tweetId}?page=*?${ownerId}`,
    ),
    client.del(`/api/v1/tweets/c/${tweetId}:${ownerId}`),
    client.del(`/api/v1/tweets/tweets-page/${ownerId}`),

    client.del(`/api/v1/dislikes/state-tweet-dislike/${tweetId}:${ownerId}`),
    client.del(`/api/v1/likes/state-tweet-like/${tweetId}:${ownerId}`),
  ]);
  console.log("res of tweet invalidate of like", res);
};
