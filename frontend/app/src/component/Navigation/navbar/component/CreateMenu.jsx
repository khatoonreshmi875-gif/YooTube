import React from "react";
import MenuLink from "./MenuLink";


const CreateMenu = ({ setContent, setlikeVideos, content }) => {
  return (
    <div className="relative">
      {/* Create Button */}
      <button
        onClick={() => {
          setlikeVideos(false);
          setContent(!content);
        }}
        className="bg-blue-600 hover:bg-blue-700 
                   text-white sm:text-sm font-medium 
                   sm:px-4 sm:py-2 sm:rounded-lg text-xs px-1 py-1 rounded-md
                   transition duration-200 shadow-sm"
      >
        + Create
      </button>

      {/* Dropdown */}
      {content && (
        <div
          className="absolute right-0 mt-2 w-48 
                     bg-white border border-slate-200 
                     rounded-lg shadow-lg 
                     py-2 z-50 text-slate-700 font-normal list-none"
        >
          <MenuLink
            to="/upload-video"
            label="Create Video"
            onClick={() => setContent(false)}
          />

          <MenuLink
            to="/create-playlist"
            label="Create Playlist"
            onClick={() => setContent(false)}
          />

          <MenuLink
            to="/create-tweet"
            label="Create Tweet"
            onClick={() => setContent(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CreateMenu;