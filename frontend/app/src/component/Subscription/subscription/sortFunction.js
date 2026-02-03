export const sortByEngagement = (subscribers = []) => {
  return [...subscribers].sort(
    (a, b) =>
      b.VideoLike +
      b.TweetLike +
      b.commentVideo -
      (a.VideoLike + a.TweetLike + a.commentVideo),
  );
};
export const priotizeSelectedChannel = (
  subscribers = [],
  selectedChannelId,
) => {
  return [...subscribers].sort((a, b) => {
    if (a?.userInfo?.channelName === selectedChannelId) return -1;
    if (b?.userInfo?.channelName === selectedChannelId) return 1;
    return 0;
  });
};
export const priotizeSelectChannel = (subscribers = [], selectedChannelId) => {
  return [...subscribers].sort((a, b) => {
    if (a?.channelName === selectedChannelId) return -1;
    if (b?.channelName === selectedChannelId) return 1;
    return 0;
  });
};
