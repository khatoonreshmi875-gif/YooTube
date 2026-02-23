import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/contextApi";

const ChannelCard = ({ f }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-4 p-4 bg-white cursor-pointer ">
      {/* Avatar */}
      <img
        src={f?.avatar}
        alt={f?.channelName}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-cyan-500 hover:scale-105 transition-transform object-cover"
        onClick={() => navigate(`/curr-user/${f?._id}/video`)}
      />

      {/* Info */}
      <div className="flex flex-col space-y-1 overflow-hidden">
        <p className="text-slate-900 font-semibold text-sm sm:text-base truncate">
          {f?.channelName}
        </p>

        <p className="text-slate-500 text-xs sm:text-sm">
          {f?.subscriberCount.toLocaleString()} Subscribers
        </p>

        <span className="text-slate-400 text-[10px] italic">
          Subscribed at{" "}
          <span className="text-slate-500 font-normal">
            {FormatTime(f?.subscribersCreatedAt)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ChannelCard;
