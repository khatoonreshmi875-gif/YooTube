import React from "react";
import { useNavigate } from "react-router-dom";
import PlaylistMenu from "./PlaylistMenu";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";
import { useState } from "react";
import { useRef } from "react";
import { getPlaylistByPlaylistId } from "../../../../Api/Playlistapi";
import HoverVideo from "../../../HomePage.jsx/HomePageComponent/HoverVideo";
import VideoInfo from "../../../HomePage.jsx/HomePageComponent/VideoInfo";

const PlaylistCard = ({ infoPlaylist, userId }) => {
  const { FormatTime, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [playlist, setplaylist] = useState([]);
  const playlistRef = useRef([]);
  const [isImageIndex, setIsImageIndex] = useState(null);
  const handlePlaylistById = async (playlistId) => {
    const result = await getPlaylistByPlaylistId(playlistId);
    setplaylist(result.data.data);
    navigate(`/playlist/${playlistId}`);
  };
  return (
    <>
      {" "}
      {infoPlaylist?.data?.map((playlist, index) => (
        <div
          key={playlist._id}
          className=" hover:bg-blue-50 bg-gradient-to-br from-slate-800 via-black to-slate-800  rounded-lg hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md shadow-md "
        >
          <HoverVideo
            video={playlist}
            videoref={playlistRef}
            onClick={() => handlePlaylistById(playlist._id)}
            isImageIndex={isImageIndex}
            setisImageIndex={setIsImageIndex}
            isData={true}
          />

          <div className="flex items-center justify-between">
            <VideoInfo v={playlist} showImage={false} />
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
                  <XMarkIcon className="h-6 w-10 text-white" />
                ) : (
                  <EllipsisVerticalIcon className="h-6 w-10 text-white " />
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
