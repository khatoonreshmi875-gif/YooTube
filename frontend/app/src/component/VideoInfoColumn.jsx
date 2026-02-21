import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./utils/contextApi.js";

const VideoInfoColumn = ({ v }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      className={`relative flex items-start w-full pb-4  px-2 bg-white mt-2  `}
    >
      <div className="flex-1 ml-3 lg:space-y-4 space-y-2">
        {/* Title */}
        <p className="text-gray-900 font-semibold lg:text-base text-sm line-clamp-1">
          {v?.title || v?.name}
        </p>

        {/* Channel Name */}
        <div className="flex items-center space-x-2">
          <img
            src={v?.owner?.avatar}
            alt={v?.owner?.channelName}
            className="lg:w-12  w-8 aspect-square rounded-full object-cover cursor-pointer 
                     hover:ring-2 hover:ring-blue-400 transition 
                     shadow-sm border border-slate-300 hover:scale-105 duration-200"
            onClick={() => {
              navigate(`/curr-user/${v?.owner?._id}/video`);
            }}
          />
          <p className="lg:text-sm text-xs text-slate-600 font-medium">
            {v?.owner?.channelName}
          </p>
        </div>

        {/* Description (if no image) */}

        <p className="text-slate-500 lg:text-xs line-clamp-1 text-[13px]">
          {v?.description}
        </p>

        {/* Views + Date */}
        <div className="flex space-x-4 xs:flex-row lg:text-sm text-[13px] text-slate-500 mt-1">
          <span>{v?.views} views</span>
          <span>{FormatTime(v?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoInfoColumn;
