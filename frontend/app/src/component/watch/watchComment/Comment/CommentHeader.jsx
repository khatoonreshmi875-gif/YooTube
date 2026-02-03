import React from "react";
import { useContext } from "react";

import { CiMenuKebab } from "react-icons/ci";
import { AppContext } from "../../../utils/contextApi.js";
const CommentHeader = ({ setIsOpen, IsOpen, c }) => {
  const { FormatTime } = useContext(AppContext);
  return (
    <div>
      <div className="flex items-start space-x-3">
        <div className="sm:w-16 sm:h-16 w-9 aspect-square rounded-full overflow-hidden ring-2 ring-blue-500">
          <img
            src={c.owner.avatar}
            alt="avatar"
            className="sm:w-16  xs:w-12 w-9 aspect-square rounded-full object-cover  "
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 mt-3">
              <p className="sm:text-sm xs:text-[13px] text-xs font-semibold text-white font-serif hover:text-gray-200">
                {c.owner.channelName}
              </p>
              <p className="sm:text-xs xs:text-[12px] text-white text-[10px] hover:text-gray-200 ">
                {FormatTime(c.createdAt)}
              </p>
            </div>
            <CiMenuKebab
              onClick={() => setIsOpen(!IsOpen)}
              className="cursor-pointer text-white hover:text-gray-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentHeader;
