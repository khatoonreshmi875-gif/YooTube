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
  const { videoId } = useParams();
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

  console.log("cloud uef", cloudName);
  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Video Player */}
      <div className="flex flex-wrap ">
        <div className="w-full  sm:px-4 sm:py-2 ">
          {" "}
          <div className="w-full sm:h-full overflow-hidden rounded-2xl shadow-lg  ">
            {video ? (
              <VidJS
                videourl={video?.publicId}
                videoFile={videoId}
                user={user._id}
                cloudName={video?.videoFile}
                className="w-full h-full object-cover  shadow-lg   "
              />
            ) : (
              // Skeleton box
              <div className="flex flex-col">
                {" "}
                <div className="w-full md:h-[30rem] h-48 bg-gray-300 animate-pulse rounded-3xl shadow-lg" />
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

            <div
              className={`font-semibold sm:text-2xl font-serif mb-4 text-white flex items-center `}
            >
              <span className={`${IsOpen ? "" : "line-clamp-1"}`}>
                {video?.title}
              </span>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium"
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
            <div className="flex items-center  sm:gap-4 sm:mb-6 space-x-4 xs:gap-1 justify-between w-full">
              <div className="flex sm:flex-row xs:space-x-3 sm:items-center flex-col space-y-1 ">
                <img
                  src={video?.owner?.avatar}
                  alt={video?.owner?.channelName}
                  className="sm:w-14 w-10 sm:h-14 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition border-white  border-2 outline-blue-500 outline-2"
                  onClick={() =>
                    navigate(`/curr-user/${video?.owner?._id}/video`)
                  }
                />
                <p className=" sm:text-lg xs:text-xs text-[10px] font-medium text-blue-100 mr-4 font-serif break-words whitespace-normal sm:block hidden">
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
                  ownerId={user._id}
                />
              )}
              <div className="relative">
                <VideoMenu v={video} isOpen={IsOpen} index={video._id} />
              </div>
            </div>
            <p className=" sm:text-lg xs:text-xs text-[10px] font-medium text-blue-100 mr-4 font-serif break-words whitespace-normal sm:hidden block mt-5">
              {video?.owner?.channelName}
            </p>
            {/* Stats + Description */}
            {IsOpen && (
              <div className="bg-blue-50 rounded-lg p-6 shadow-sm  ">
                <div className="flex items-center space-x-6 mb-4 text-gray-600 ">
                  <p className="text-xs sm:text-sm ">{video?.views} views</p>
                  <p className="text-xs sm:text-sm">
                    {FormatTime(video?.createdAt)}
                  </p>
                </div>

                <p className="text-gray-700 font-light leading-relaxed break-words max-w-4xl">
                  {video?.description}
                </p>
              </div>
            )}
          </div>
          <hr className="text-white" />
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
