import React, { useContext, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/contextApi";

import { useCallback } from "react";
import SimilarVideoSkeleton from "./SimilarVideoSkeleton";
import VideoMenu from "../../HomePage.jsx/HomePageComponent/VideoMenu";

const PlaylistVideo = ({ similarVideos }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  //usref
  const videoref = useRef([]);
  const hasNomore = useRef(false);

  //usestate
  const [isPlaying, setisPlaying] = useState(null);
  const [loading, setloading] = useState(false);
  //function
  const handleVideoPage = useCallback(
    async (videoId, userId) => {
      navigate(`/video-rec-page/${videoId}/user/${userId},`, {
        state: {
          playlist: similarVideos,
        },
      });
    },
    [navigate],
  );
  return (
    <div>
      <div className="bg-blue-100 space-y-5 p-4 rounded-lg shadow-lg">
        {similarVideos?.map((s, index) => (
          <div
            key={s._id}
            className="flex sm:flex-row flex-col lg:flex-row justify-between 
             space-x-3 p-3 rounded-xl 
             bg-white border border-slate-200 
             shadow-sm hover:shadow-md 
             transition-all duration-300 ease-in-out 
             hover:scale-[1.02] cursor-pointer 
             mx-6 sm:mx-0 relative my-4"
          >
            {/* Video Preview */}

            <div className="flex sm:flex-row flex-col space-x-6">
              <video
                poster={s.thumbnail}
                className="sm:w-56 sm:h-32 w-full h-48 rounded-lg shadow-sm 
                 object-cover cursor-pointer 
                 hover:ring-2 hover:ring-blue-400 transition-all duration-200"
                ref={(el) => (videoref.current[index] = el)}
                onMouseOver={() => {
                  setisPlaying(index);
                  videoref.current[index]?.play();
                }}
                onMouseLeave={() => {
                  setisPlaying(null);
                  videoref.current[index]?.pause();
                }}
                onClick={() => handleVideoPage(s._id, s.owner)}
              >
                <source src={s.videoFile} type="video/mp4" />
              </video>

              {/* Video Info */}
              <div className="flex sm:static relative">
                <div className="flex flex-col justify-between space-y-1 w-full my-2">
                  <p
                    className="font-semibold text-md sm:text-sm line-clamp-2 
                     text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {s.title}
                  </p>
                  <p className="text-xs text-gray-300">{s.owner.channelName}</p>
                  <div className="flex text-xs text-gray-400 space-x-2">
                    <p>{s.views} views</p>
                    <p>{FormatTime(s.createdAt)}</p>
                  </div>
                </div>
                <div className="sm:hidden block">
                  <VideoMenu index={index} v={s} />
                </div>
              </div>
            </div>

            {/* Video Menu (Desktop) */}
            <div className="hidden sm:block">
              <VideoMenu index={index} v={s} />
            </div>
          </div>
        ))}
      </div>

      {/* No more videos */}
      {hasNomore.current && (
        <p className="text-lg text-center font-serif w-full bg-slate-800 py-3 text-gray-200">
          No more videos are available
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SimilarVideoSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PlaylistVideo);
