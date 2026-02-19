import React from "react";

const PlaylistHeader = ({ allPlaylist }) => {
  return (
    <>
     <div className="sm:flex w-full bg-white items-center justify-between rounded-xl shadow-lg p-6 hidden">
  {/* Left image */}
  <img
    src={allPlaylist?.playlist?.thumbnail || "/download.jpg"}
    alt="Playlist Thumbnail"
    className="w-[28%] aspect-video object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
  />

  {/* Center text */}
  <div className="flex-1 text-center px-4">
    <h2 className="text-slate-900 font-serif font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl">
      {allPlaylist?.playlist?.name}
    </h2>
    <p className="text-slate-500 mt-2 text-sm sm:text-base italic">
      Your curated playlist
    </p>
  </div>

  {/* Right image */}
  <img
    src={allPlaylist?.playlist?.thumbnail || "/download.jpg"}
    alt="Playlist Thumbnail"
    className="w-[28%] aspect-video object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
  />
</div>

{/* Owner Info */}
<div className="flex items-center mt-6 space-x-4 p-4">
  <img
    className="h-20 w-20 rounded-full border-2 border-slate-300 shadow-sm"
    src={allPlaylist?.playlist?.owner?.avatar}
    alt="Owner Avatar"
  />
  <p className="sm:text-lg text-sm font-semibold font-serif text-slate-700">
    {allPlaylist?.playlist?.owner?.channelName}
  </p>
</div>

{/* Playlist Stats */}
<div className="flex space-x-8 mt-4 font-serif text-sm sm:text-base text-slate-700 px-4">
  <p>Playlist</p>
  <p>{allPlaylist?.playlist?.videos?.length} videos</p>
  <p>{allPlaylist?.totalView || allPlaylist?.playlist?.totalViews} Views</p>
</div>

<hr className="my-6 border-slate-300" />
    </>
  );
};

export default PlaylistHeader;
