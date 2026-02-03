const sortVideos = (videos) => {
  return videos.sort((a, b) => {
    switch (sortOption) {
      case "titleAsc":
        return a?.video?.title.localeCompare(b?.video?.title);
      case "titleDes":
        return b?.video?.title.localeCompare(a?.video?.title);
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });
};
