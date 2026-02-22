export const fetchAndUpdateVideos = async ({
  Id = null,
  page,
  apiCall,
  fetchNextVideo,
  setallvideo,
  setsimilarVideos = null,
  setHasNoVideo = null, // accept setter from component
  handleAxiosError,
  isDirectData = false,
  hasNoVideo,
  navigate,
}) => {
  try {console.log("the similar ivdoe page run")
    const res = Id ? await apiCall(Id, page) : await apiCall(page);
    const videoData = isDirectData ? res.data.data : res.data.data.video;
console.log("videoData",videoData)
    if (videoData.length === 0) {
      if (isDirectData) {
        setHasNoVideo?.(true); // safe optional call
      } else {
        fetchNextVideo?.();
      }
    }

    setallvideo((prev) => {
      const merged = [...prev, ...videoData];
      const uniqueMap = new Map(merged.map((item) => [item?._id, item]));

      if (isDirectData && uniqueMap.size < 2) {
        fetchNextVideo?.();
      }

      return [...uniqueMap.values()];
    });
  } catch (error) {
    handleAxiosError(error);
  }
};
