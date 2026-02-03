import React from "react";

const CommentSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col m-5 bg-slate-100 rounded-xl p-4">
        <div className="flex flex-row pl-3 w-full mb-2">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="flex space-x-2 w-full mt-3 px-4">
            <p className="w-16 h-3 bg-gray-300 animate-pulse rounded-xl"></p>
            <p className="w-12 h-3 bg-gray-300 animate-pulse rounded-xl"></p>
          </div>
        </div>

        {/* Name + timestamp */}
        <div className="flex flex-col pl-3 w-full mb-2">
          {/* Comment text */}
          <p className="w-full h-8 bg-gray-300 animate-pulse rounded-xl my-4"></p>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-5">
          <div className="flex space-x-4 items-start px-4">
            <button className="w-11 h-3 bg-gray-300 animate-pulse rounded-xl"></button>
            <button className="w-12 h-3 bg-gray-300 animate-pulse rounded-xl"></button>
          </div>
          <div className="w-12 h-3 bg-gray-300 animate-pulse rounded-xl mx-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
