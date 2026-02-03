import React from "react";
import { useNavigate } from "react-router-dom";
import PlaylistMenu from "./PlaylistMenu";
import { FaXmark } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";
import { useState } from "react";
import { useRef } from "react";
import { getPlaylistByPlaylistId } from "../../../../Api/Playlistapi";

const PlaylistCard = ({ infoPlaylist, userId }) => {
  const { FormatTime, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [playlist, setplaylist] = useState([]);
  const playlistRef = useRef([]);
  const handlePlaylistById = async (playlistId) => {
    const result = await getPlaylistByPlaylistId(playlistId);
    setplaylist(result.data.data);
  };
  return (
    <>
      {" "}
      {infoPlaylist?.data?.map((playlist, index) => (
        <div
          key={playlist._id}
          className=" hover:bg-blue-50 bg-gradient-to-br from-slate-800 via-black to-slate-800 m-4 p-2 rounded-lg hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md shadow-md "
        >
          <div className=" w-full relative">
            {/* image */}
            <img
              src={playlist.thumbnail || "/download.jpg"}
              className=" h-[15rem] w-full  rounded-t-lg  object-cover cursor-pointer mx-auto "
              ref={(el) => (playlistRef.current[playlist._id] = el)}
              onClick={() => {
                if (playlistRef.current[playlist._id]) {
                  localStorage.setItem("playlistid", playlist._id);
                  handlePlaylistById(playlist._id);
                }

                navigate(`/playlist/${playlist._id}`);
              }}
            />
            {/* total video */}
            <p className="absolute bottom-0 h-12 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-right p-2 text-sm sm:text-base font-medium text-white rounded-b-lg">
              Total video:{playlist?.videos?.length}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="w-4/5 mt-3">
              <p className=" font-medium lg:text-lg font-serif text-md  text-gray-100">
                {playlist.name}
              </p>
              <p className=" line-clamp-1  font-light lg:text-md text-sm font-sans text-gray-200">
                {playlist.description}
              </p>
              <div className="flex space-x-5">
                {" "}
                <p className="  font-light lg:text-sm text-xs text-gray-200 italic ">
                  {FormatTime(playlist.createdAt)}
                </p>
                <div className="text-white flex space-x-2 relative">
                  <span className="text-lg absolute bottom-0 ">.</span>
                  <p className="text-sm font-thin">playlist</p>
                </div>
              </div>
            </div>
            {(user._id === userId ||
              user.role === "admin" ||
              user.role === "moderator") && (
              <div
                className=" text-white relative"
                onClick={() => {
                  setisOpen(isOpen === index ? null : index);
                }}
              >
                {isOpen === index ? (
                  <FaXmark />
                ) : (
                  <BiDotsVerticalRounded className="text-white text-xl hover:text-gray-300" />
                )}
                <PlaylistMenu
                  isOpen={isOpen}
                  setRefresh={setRefresh}
                  playlist={playlist}
                  refresh={refresh}
                  index={index}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PlaylistCard;
