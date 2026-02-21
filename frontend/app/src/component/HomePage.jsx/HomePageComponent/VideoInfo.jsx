import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/contextApi.js";
import Button from "../../Tweet/UserTweet/Button.jsx";

const VideoInfo = ({
  v,
  isData = false,
  watchedAt,
  showImage = true,
  dislikedVideo,
  likedAt,
}) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex items-start w-full pb-4 h-[30%] px-2 bg-white  `}
    >
      {showImage && (
        <img
          src={v?.owner?.avatar}
          alt={v?.owner?.channelName}
          className="w-12 aspect-square rounded-full object-cover cursor-pointer 
                     hover:ring-2 hover:ring-blue-400 transition 
                     shadow-sm border border-slate-300 hover:scale-105 duration-200"
          onClick={() => {
            navigate(`/curr-user/${v?.owner?._id}/video`);
          }}
        />
      )}

      <div className="flex-1 ml-3 space-y-1">
        {/* Title */}
        <p className="text-gray-900 font-semibold sm:text-lg text-md line-clamp-1">
          {v?.title || v?.name}
        </p>

        {/* Channel Name */}
        <p className="lg:text-sm text-xs text-slate-600 font-medium">
          {v?.owner?.channelName}
        </p>

        {/* Description (if no image) */}
        {showImage === false && (
          <p className="text-slate-500 lg:text-sm line-clamp-1 text-[0.85rem]">
            {v.description}
          </p>
        )}

        {/* Views + Date */}
        <div className="flex space-x-4 xs:flex-row lg:text-sm text-xs text-slate-500 mt-1">
          <span>{v?.views ?? v?.totalViews} views</span>
          <span>
            {v?.createdAt ? (
              FormatTime(v?.createdAt)
            ) : (
              <p>watched at {FormatTime(watchedAt)}</p>
            )}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          {likedAt && (
            <>
              <small className="block text-[11px] text-slate-500 ">
                Liked on {FormatTime(likedAt)}
              </small>

              <Button
                label="  Dislike"
                bg="bg-slate-200 text-slate-700 hover:bg-slate-400"
                onClick={() => dislikedVideo(v?._id)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
