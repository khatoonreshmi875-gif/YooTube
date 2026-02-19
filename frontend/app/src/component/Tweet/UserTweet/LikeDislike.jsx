import React from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";

const LikeDislike = ({ onClick, onClick1, reaction }) => {
  return (
    <div className="flex space-x-6 lg:text-base   xs:text-sm text-xs">
      {/* Like */}
      <div className="flex items-center space-x-2 text-slate-700">
        <button
          onClick={onClick1}
          className="hover:text-blue-600 transition-colors"
        >
          {reaction.liked ? <BiSolidLike /> : <BiLike />}
        </button>
        <span className="text-slate-600">{reaction?.likeCount}</span>
      </div>

      {/* Dislike */}
      <div className="flex items-center space-x-2 text-slate-700">
        <button
          onClick={onClick}
          className="hover:text-blue-600 transition-colors"
        >
          {reaction.disliked ? <BiSolidDislike /> : <BiDislike />}
        </button>
        <span className="text-slate-600">{reaction?.dislikeCount}</span>
      </div>
    </div>
  );
};

export default LikeDislike;
