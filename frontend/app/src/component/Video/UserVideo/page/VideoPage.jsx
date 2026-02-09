import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { XMarkIcon } from "@heroicons/react/24/outline";

import { AppContext } from "../../../utils/contextApi.js";

import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";
import VideoMenu from "../VideoMenu.jsx";
import EmptyVideoPage from "./EmptyVideoPage.jsx";

const VideoPage = () => {
  const { userId } = useParams();
  const { video, user } = useContext(AppContext);
  const [IsOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef([]);
  const [IsPlayingIndex, setIsPlayingIndex] = useState(null);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleVideoPage = async (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`);
  };
  if (video?.length === 0) {
    return <LoadingSpinner label="Fetching Videos" />;
  }
  console.log("user role", user.role, user);
  return (
    <>
      {video?.videos?.length === 0 ? (
        <EmptyVideoPage userId={userId} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2  lg:gap-5  ">
          {video.videos.map((v, index) => (
            <div
              key={index}
              className="bg-gradient-to-tl from-slate-800 via-black to-slate-800 rounded-xl shadow-md  hover:shadow-lg transition pb-1 hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md "
            >
              {/* Video / Thumbnail */}
              <div
                onMouseEnter={() => setIsPlayingIndex(index)}
                onMouseLeave={() => setIsPlayingIndex(null)}
                className="relative w-full cursor-pointer p-1"
              >
                <div className=" ">
                  {IsPlayingIndex === index ? (
                    <video
                      className="w-full aspect-video px-1 lg:px-4 pt-2 object-cover rounded-3xl  "
                      ref={(el) => (videoRef.current[index] = el)}
                      onMouseLeave={() => setIsPlayingIndex(null)}
                      controls
                      muted
                      autoPlay
                      onClick={() => handleVideoPage(v?._id, v?.owner?._id)}
                    >
                      <source src={v.videoFile} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-full aspect-video px-1 pt-2 object-cover  lg:px-4 rounded-xl lg:rounded-3xl hover:opacity-90 transition shadow-blue-50 "
                        onClick={() => setIsPlayingIndex(index)}
                        onMouseEnter={() => setIsPlayingIndex(index)}
                      />
                      <p className="absolute bottom-4 right-6 bg-black/60 text-white text-xs px-2 py-1 rounded">
                        {formatTime(v.duration)}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Video Info */}
              <div className="flex justify-between items-start px-2 mt-2 lg:pb-4 relative ">
                <div className="flex items-start px-4  relative ">
                  <div className="flex-1">
                    <p className="font-semibold lg:text-lg text-white text-[1rem]">
                      {v.title}
                    </p>
                    <p className="text-gray-300 lg:text-sm line-clamp-1 text-[0.8rem]">
                      {v.description}
                    </p>
                    <p className="text-gray-400 lg:text-sm text-[0.7rem]">
                      {v.views} views
                    </p>
                  </div>
                </div>
                {(user._id === userId ||
                  user.role === "admin" ||
                  user.role === "moderator") && (
                  <div className="">
                    <button
                      onClick={() => setIsOpen(IsOpen === index ? null : index)}
                      className="text-2xl ml-auto text-white hover:text-gray-300 transition "
                    >
                      {IsOpen === index ? (
                        <XMarkIcon className="h-6 w-10 text-white" />
                      ) : (
                        <EllipsisVerticalIcon className="h-6 w-10 text-white " />
                      )}
                    </button>
                    <VideoMenu v={v} isOpen={IsOpen} index={index} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default VideoPage;
