import React from "react";

const SimilarVideoSkeleton = () => {
  return (
    <div>
      <div className="md:flex m-4 flex-col md:flex-row space-y-5 bg-white p-2  rounded-lg ">
        <div className="lg:w-44 md:w-60 h-28 rounded-xl bg-gray-300 animate-pulse "></div>
        <div className="flex flex-col space-y-1 px-4 flex-1">
          <p className="font-bold lg:w-60  bg-gray-300 animate-pulse h-4 rounded-xl "></p>
          <p className="text-xs font-normal lg:w-12 w-44 bg-gray-300 animate-pulse h-4 rounded-xl "></p>
          <div className="flex text-xs font-normal space-x-2 w-32">
            <p className="w-12 bg-gray-300 animate-pulse rounded-xl h-4"></p>
            <p className="w-12 bg-gray-300 animate-pulse rounded-xl h-4"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarVideoSkeleton;
