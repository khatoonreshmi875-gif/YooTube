import React, { useContext } from "react";
import { AppContext } from "../../../../../utils/contextApi";

const TweetHeader = ({ tweet }) => {
  const { FormatTime } = useContext(AppContext);

  return (
    <>
      <div className="flex items-center p-4 border-b border-gray-200  h-[13%] ">
        <img
          src={tweet?.owner?.avatar}
          
          onClick={() => {
            handleAvatar(tweet?.owner?._id);
          }}
          alt="avatar"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="font-light text-gray-300 font-serif ">
            {tweet?.owner?.channelName || tweet?.user?.channelName}
          </p>
          <p className="text-sm text-gray-400 italic font-light">
            {FormatTime(tweet?.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(TweetHeader);
