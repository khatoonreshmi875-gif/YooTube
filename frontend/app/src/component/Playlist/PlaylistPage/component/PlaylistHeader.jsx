import React from "react";

const PlaylistHeader = ({allPlaylist}) => {
  return (
    <>
      <div className="relative ">
        <img
          src={allPlaylist?.playlist?.thumbnail || "/download.jpg"}
          alt="Playlist Thumbnail"
          className="w-full h-60 object-cover rounded-xl shadow-md"
        />
        <p className="absolute bottom-4 left-6 lg:text-3xl sm:text-2xl xs:text-lg text-base font-serif font-bold text-white drop-shadow-lg">
          {allPlaylist?.playlist?.name}
        </p>
      </div>

      {/* Owner Info */}
      <div className="flex items-center mt-6 space-x-4">
        <img
          className="h-20 w-20 rounded-full border-2 border-gray-300 shadow-sm"
          src={allPlaylist?.playlist?.owner?.avatar}
          alt="Owner Avatar"
        />
        <p className="sm:text-lg text-sm xs:text-base font-semibold font-serif text-gray-300">
          {allPlaylist?.playlist?.owner?.channelName}
        </p>
      </div>

      {/* Playlist Stats */}
      <div className="flex space-x-8 mt-4  sm:font-medium font-normal font-serif text-sm sm:text-base text-white ">
        <p>Playlist</p>
        <p>{allPlaylist?.playlist?.videos?.length} videos</p>
        <p>{allPlaylist?.totalViews}Views</p>
      </div>

      <hr className="my-6 border-gray-300" />
    </>
  );
};

export default PlaylistHeader;
