import React, { useContext, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/contextApi";

import { useCallback } from "react";
import SimilarVideoSkeleton from "./SimilarVideoSkeleton";

const PlaylistVideo = ({ similarVideos }) => {
  const { FormatTime } = useContext(AppContext);
  const videoref = useRef([]);
  const [isPlaying, setisPlaying] = useState(null);
  const navigate = useNavigate();

  const hasNomore = useRef(false);

  const [loading, setloading] = useState(false);

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
      <div className="bg-slate-800 space-y-5 p-4 ">
        {similarVideos?.map((s, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-2 rounded-lg hover:from-slate-600 transition bg-gradient-to-br from-slate-950 via-slate-900   "
          >
            {/* Video Thumbnail */}
            <video
              controls
              poster={s.thumbnail}
              className="w-44 h-28 rounded-xl shadow-md object-cover cursor-pointer"
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
            <div className="flex flex-col justify-between space-y-1 w-full">
              <p className="font-semibold text-sm text-white line-clamp-2">
                {s.title}
              </p>
              <p className="text-xs text-gray-300">{s.owner.channelName}</p>
              <div className="flex text-xs text-gray-200 space-x-2">
                <p>{s.views} views</p>
                <p>{FormatTime(s.createdAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasNomore.current && (
        <p className="text-2xl text-center  font-serif w-full bg-slate-700">
          No more videos are available
        </p>
      )}
      {loading && (
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <SimilarVideoSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PlaylistVideo);
