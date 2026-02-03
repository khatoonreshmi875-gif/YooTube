// helpers/videoHelpers.js
export const sortVideo = (videos, label) => {
  if (!label) return videos;
  return videos.sort((a, b) => {
    if (!label) return 0;
    if (a.channelName || b.channelName) {
      if (a.channelName === label) return -1;
      if (b.channelName === label) return 1;
    } else if (a.title || b.title) {
      if (a.title === label) return -1;
      if (b.title === label) return 1;
    } else if (a?.owner?.channelName || b.owner?.channelName) {
      if (a.owner?.channelName === label) return -1;
      if (b.owner?.channelName === label) return 1;
    } else {
      return 0;
    }
  });
};
