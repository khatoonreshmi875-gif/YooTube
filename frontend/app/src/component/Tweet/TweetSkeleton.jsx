import React from "react";

const TweetSkeleton = () => {
  return (
    <div className="bg-gray-200 h-auto lg:w-1/4 md:1/2 w-full mx-auto rounded-lg animate-pulse px-2">
      <div className="flex items-center p-3  border-b border-gray-400">
        <div className=" w-14  aspect-square bg-gray-300 rounded-full"></div>
        <div className="py-4 space-y-4 ">
          <p className="bg-gray-300 w-40 sm:h-5 h-2 rounded-lg"></p>
          <p className="bg-gray-300 w-40 sm:h-2 h-0.5 rounded-lg"></p>
        </div>
      </div>
      <div className="p-4 bg-gray-300 w-full sm:h-14 h-7   xl:py-3 md:my-3 xs:my-1 rounded-lg"></div>
      <div className="w-11/12 mx-auto sm:h-80 h-64 bg-gray-300 rounded-lg md::my-9  my-6"></div>
      <div className="flex ">
        <p className="bg-gray-300  w-28  sm:h-4 h-2  rounded-lg  mx-6"></p>
        <p className="bg-gray-300  w-28  sm:h-4 h-2    rounded-lg"></p>
      </div>
    </div>
  );
};

export default TweetSkeleton;
