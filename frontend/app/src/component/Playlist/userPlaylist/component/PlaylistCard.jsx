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

const PlaylistCard = ({ infoPlaylist, userId, setInfoPlaylist }) => {
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
      {infoPlaylist?.map((playlist, index) => (
        <div
          key={playlist._id}
          className=" bg-white rounded-xl shadow-sm border border-gray-200 
                        hover:shadow-md transition w-full h-full "
        >
          <HoverVideo
            video={playlist}
            videoref={playlistRef}
            onClick={() => handlePlaylistById(playlist._id)}
            isImageIndex={isImageIndex}
            setisImageIndex={setIsImageIndex}
            isData={true}
          />

          <div className="flex justify-between relative">
            <VideoInfo v={playlist} showImage={false} />
            {(user._id === userId ||
              user.role === "admin" ||
              user.role === "moderator") && (
              <PlaylistMenu
                setRefresh={setRefresh}
                playlist={playlist}
                refresh={refresh}
                index={index}
                userId={userId}
                setInfoPlaylist={setInfoPlaylist}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PlaylistCard;
