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
          className="w-12 aspect-square rounded-full object-cover"
        />
        <div className="ml-4">
          <p className=" text-slate-600  sm:text-sm text-xs font-medium   ">
            {tweet?.owner?.channelName || tweet?.user?.channelName}
          </p>
          <p className="lg:text-sm text-xs text-slate-500">
            {FormatTime(tweet?.updatedAt)}
          </p>
        </div>
      </div>
    </>
  );
};

export default React.memo(TweetHeader);
