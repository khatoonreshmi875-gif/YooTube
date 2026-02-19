import React, { useContext } from "react";
import { AppContext } from "./contextApi";
import Button from "../Tweet/UserTweet/Button";

const EmptySkeleton = ({
  path,
  heading_text,
  msg,
  button_msg,
  onClick,
  userId,
  Icon,
}) => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="flex items-center justify-center min-h-0   ">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div
            className="sm:w-16 w-12 aspect-square flex items-center justify-center 
                        rounded-full bg-blue-50"
          >
            <Icon className="w-8 h-8 text-blue-600" />
          </div>

          {/* Title */}
          <h2 className="text-sm sm:text-xl font-semibold text-slate-900">
            {heading_text}
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-slate-500 max-w-sm">{msg}</p>

          {/* Button */}
          <Button
            onClick={onClick}
            bg="bg-blue-100 text-blue-600  hover:bg-blue-400 "
            label={button_msg}
          />
        </div>
      </div>
    </>
  );
};

export default EmptySkeleton;
