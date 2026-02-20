import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { onlyVideo } from "../../../Api/VideoApi.js";
import { AppContext } from "../../utils/contextApi.js";
import MainVideoSkeleton from "./MainVideoSkeleton.jsx";
import VideoLike from "./VideoLike.jsx";
import VidJS from "./VidJS.jsx";
import VideoMenu from "../../HomePage.jsx/HomePageComponent/VideoMenu.jsx";

const Mainvideo = () => {
  const { FormatTime, user } = useContext(AppContext);
  const [video, setVideo] = useState();
  const { videoId, userId } = useParams();
  const [cloudName, setCloudName] = useState("");
  const [IsOpen, setIsOpen] = useState(null);

  const navigate = useNavigate();
  let cloud;
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const result = await onlyVideo(videoId);
        console.log("response of only video", result);
        setVideo(result.data.data);
        cloud = result.data.data.videoFile.split("/").at(-5);
        setCloudName(cloud);
      } catch (err) {
        console.error("Error fetching video", err);
      }
    };
    fetchVideo();
  }, [videoId]);

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Video Player */}
      <div className="flex flex-wrap">
        <div className="w-full sm:px-4 sm:py-2">
          <div className="w-full aspect-video overflow-hidden rounded-2xl shadow-md">
            {video ? (
              <VidJS
                videourl={video?.publicId}
                videoFile={videoId}
                user={user?._id}
                cloudName={video?.videoFile}
                className="w-full  object-cover rounded-2xl shadow-md"
              />
            ) : (
              // Skeleton box
              <div className="flex flex-col">
                <div className="w-full md:h-[30rem] h-48 bg-slate-200 animate-pulse rounded-2xl shadow-sm" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Info */}
      {video ? (
        <>
          <div className="w-full px-6">
            {/* Title */}
            <div className="font-semibold sm:text-2xl  mb-4 text-slate-900 flex items-center">
              <span className={`${IsOpen ? "" : "line-clamp-1"}`}>
                {video?.title}
              </span>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium ml-2"
              >
                {/* Show text on sm and up */}
                <span className="hidden sm:inline text-xs">
                  {IsOpen ? "Read less" : "Read more"}
                </span>

                {/* Show icon only on small screens */}
                <span className="sm:hidden text-[12px] ml-1">
                  {IsOpen ? "▲" : "▼"}
                </span>
              </button>
            </div>

            {/* Owner + Actions */}
            <div className="flex items-center sm:gap-4 sm:mb-6 space-x-4 xs:gap-1 justify-between w-full">
              <div className="flex sm:flex-row xs:space-x-3 sm:items-center flex-col space-y-1">
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.channelName}
                  className="sm:w-14 w-10 sm:h-14 h-10 rounded-full object-cover cursor-pointer 
                           hover:ring-2 hover:ring-blue-500 transition border border-slate-300"
                  onClick={() =>
                    navigate(`/curr-user/${video?.owner?._id}/video`)
                  }
                />
                <p className="lg:text-base   xs:text-sm text-xs font-medium text-slate-700 mr-2  break-words whitespace-normal sm:block hidden">
                  {video?.owner?.channelName}
                </p>
              </div>

              {video && (
                <VideoLike
                  videoId={video?._id}
                  initialLikeCount={video?.videoLikeCount}
                  initialDislikeCount={video?.videoDislikeCount}
                  initialLike={video?.isLikedState}
                  initialDislike={video?.isDislikedState}
                  userId={userId}
                />
              )}
              <div className="relative">
                <VideoMenu v={video} isOpen={IsOpen} index={video._id} />
              </div>
            </div>

            <p className="lg:text-base   xs:text-sm text-xs font-medium text-slate-700 mr-4 break-words whitespace-normal sm:hidden block mt-5">
              {video?.owner?.channelName}
            </p>

            {/* Stats + Description */}
            {IsOpen && (
              <div className="bg-slate-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-6 mb-4 text-slate-600">
                  <p className="text-xs sm:text-sm">{video?.views} views</p>
                  <p className="text-xs sm:text-sm">
                    {FormatTime(video?.createdAt)}
                  </p>
                </div>

                <p className="text-slate-700 font-light leading-relaxed break-words max-w-4xl sm:text-sm text-xs">
                  {video?.description}
                </p>
              </div>
            )}
          </div>
          <hr className="border-slate-200" />
        </>
      ) : (
        <>
          {/* Empty / Loading State */}
          <MainVideoSkeleton />
        </>
      )}
    </div>
  );
};

export default React.memo(Mainvideo);
