import React from "react";
import { useContext } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
import { CiMenuKebab } from "react-icons/ci";
import { AppContext } from "../../../utils/contextApi.js";
const CommentHeader = ({ setIsOpen, IsOpen, c }) => {
  const { FormatTime } = useContext(AppContext);
  const displaytime = (createdAt) => {
    const createdTimeInMillisecond = new Date(createdAt).getTime();
    const now = Date.now();
    const timeDiff = createdTimeInMillisecond - now / 60000;
    if (timeDiff > 1) {
      return "just now";
    } else {
      return FormatTime(createdAt);
    }
  };
  return (
    <div>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="sm:w-16 sm:h-16 w-9 aspect-square rounded-full overflow-hidden">
          <img
            src={c.owner.avatar}
            alt="avatar"
            className="sm:w-16 xs:w-12 w-9 aspect-square rounded-full object-cover"
          />
        </div>

        {/* Channel Info */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 mt-3">
              <p
                className="lg:text-sm text-xs font-medium 
                            text-slate-900  hover:text-blue-600 transition-colors"
              >
                {c.owner.channelName}
              </p>
              <p
                className="sm:text-xs xs:text-[12px] text-slate-600 text-[10px] 
                            hover:text-blue-500 transition-colors"
              >
                {displaytime(c.createdAt)}
              </p>
            </div>

            {/* Menu Icon */}
            <CiMenuKebab
              onClick={() => setIsOpen(!IsOpen)}
              className="cursor-pointer text-slate-700 hover:text-blue-600 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentHeader;
