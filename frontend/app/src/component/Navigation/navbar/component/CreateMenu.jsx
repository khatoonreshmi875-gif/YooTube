import React from "react";
import MenuLink from "./MenuLink";

const CreateMenu = ({ setContent, setlikeVideos, content }) => {
  return (
    <>
      {" "}
      <div
        onClick={() => {
          setlikeVideos(false);
          setContent(!content);
        }}
        className="font-serif md:text-xl sm:hover:border-white sm:border-2 h-fit w-fit p-1 rounded-lg text-blue-50 sm:text-lg xs:text-base text-sm bg-black/20 sm:ml-4 shadow-md shadow-cyan-700 active:shadow-black"
      >
        +Create
      </div>
      {content && (
        <div className="right-20 top-20 absolute text-gray-500 bg-white list-none py-4 rounded-xl text-sm px-1 font-serif">
          <MenuLink to="/upload-video" label="create Video" />
          <MenuLink to="/create-playlist" label="create Playlist" />
          <MenuLink to="/create-tweet" label=" create Tweet" />
        </div>
      )}
    </>
  );
};

export default CreateMenu;
