import React from "react";

const PlaylistHeader = ({ allPlaylist }) => {
  return (
    <>
      <div className=" w-full">
        <div className="sm:flex w-full bg-gradient-to-r from-black via-slate-900 to-black  items-center justify-between rounded-xl shadow-lg p-6 hidden">
          {/* Left image */}
          <img
            src={allPlaylist?.playlist?.thumbnail || "/download.jpg"}
            alt="Playlist Thumbnail"
            className="w-[28%] aspect-video object-cover rounded-xl shadow-md transform hover:scale-105 transition duration-300"
          />

          {/* Center text */}
          <div className="flex-1 text-center px-4">
            <h2 className="text-white font-serif font-bold lg:text-4xl  md:text-3xl sm:text-2xl text-xl drop-shadow-lg">
              {allPlaylist?.playlist?.name}
            </h2>
            <p className="text-gray-300 mt-2 text-sm sm:text-base font-light italic">
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
      </div>
      <div className="block sm:hidden">
        {" "}
        <div className="flex justify-center w-full bg-">
          <img
            src={allPlaylist?.playlist?.thumbnail || "/download.jpg"}
            alt="Playlist Thumbnail"
            className="w-full aspect-video  object-cover rounded-xl shadow-md mx-auto "
          />
        </div>
        <p className="absolute sm:bottom-4 sm:left-6 lg:text-3xl sm:text-2xl xs:text-lg text-base font-serif font-bold text-white drop-shadow-lg px-4">
          {allPlaylist?.playlist?.name}
        </p>
      </div>

      {/* Owner Info */}
      <div className="flex items-center mt-6 space-x-4 p-4">
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
      <div className="flex space-x-8 mt-4  sm:font-medium font-normal font-serif text-sm sm:text-base text-white px-4">
        <p>Playlist</p>
        <p>{allPlaylist?.playlist?.videos?.length} videos</p>
        <p>
          {allPlaylist?.totalView || allPlaylist?.playlist?.totalViews}Views
        </p>
      </div>

      <hr className="my-6 border-gray-300" />
    </>
  );
};

export default PlaylistHeader;
