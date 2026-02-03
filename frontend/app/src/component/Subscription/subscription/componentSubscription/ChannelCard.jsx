import React, { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";
import { useNavigate } from "react-router-dom";

const ChannelCard = ({ f }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className=" flex items-center space-x-4 py-3   mb-4 lg:mb-0 lg:mx-0 mx-auto max-w-44 min-w-20 sm:pl-6">
      <img
        src={f.avatar}
        alt=""
        className=" w-16  aspect-square md:w-20 md:h-20 sm:w-24 sm:h-24 rounded-full border-2 border-cyan-700 hover:scale-105 transition-transform cursor-pointer "
        onClick={() => navigate(`/curr-user/${f._id}/video`)}
      />
      <div className="flex flex-col space-y-1 mt-3 ">
        <p className="text-sm text-wrap text-white font-serif  w-36">
          {f.channelName}
        </p>

        <p className="text-gray-300 text-xs md:text-xs font-serif font-extralight">
          {f.subscriberCount} Subscribers
        </p>
        <span className="text-gray-500 text-[10px] italic">
          subscribed at{" "}
          <span className="text-gray-300 font-light">
            {FormatTime(f.subscribersCreatedAt)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ChannelCard;
