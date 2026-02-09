import React from "react";

const Videoskeleton = () => {
  return (
    <div className="px-4 py-4 w-full aspect-video">
      <div className="w-full aspect-video rounded-lg bg-gray-300 animate-pulse" />
      <div className="flex w-5/6 my-3 px-4">
        <div className="xs:w-16 xs:h-16 h-12 w-12 bg-gray-300 animate-pulse rounded-full" />
        <div className="flex-1 ml-3 space-y-2">
          <div className="w-3/4 h-4 bg-gray-300 animate-pulse rounded" />
          <div className="w-1/2 h-3 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};
export default Videoskeleton;
