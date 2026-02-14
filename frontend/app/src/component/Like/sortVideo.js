export const sortVideos = (videos, sortOption) => {
  return [...videos].sort((a, b) => {
    switch (sortOption) {
      case "titleAsc":
        return (
          a?.video?.title || a?.title.localeCompare(b?.video?.title || b.title)
        );
      case "titleDes":
        return (
          b?.video?.title || b?.title.localeCompare(a?.video?.title || a?.title)
        );
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });
};
