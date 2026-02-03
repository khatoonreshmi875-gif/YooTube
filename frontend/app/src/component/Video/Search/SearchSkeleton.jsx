import React from "react";

const SearchSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row w-full space-x-4 my-6 lg:h-64 md:h-48 h-64 bg-white p-2 rounded-lg ">
        {/* Thumbnail skeleton */}
        <div className="sm:w-1/3 w-full sm:h-full h-44 bg-gray-300 animate-pulse rounded-lg" />

        {/* Info section */}
        <div className="flex-1 sm:space-y-3 space-y-2 mt-2">
          {/* Title */}
          <div className="w-3/4 h-[6%] bg-gray-300 animate-pulse rounded" />
          {/* Channel name */}
          <div className="w-1/3 h-[6%] bg-gray-300 animate-pulse rounded" />
          {/* Views + Date */}
          <div className="flex space-x-6">
            <div className="w-20 h-[6%] bg-gray-300 animate-pulse rounded" />
            <div className="w-24 h-[6%] bg-gray-300 animate-pulse rounded" />
          </div>
          {/* Description */}
          <div className="w-full h-[6%] bg-gray-300 animate-pulse rounded" />
          <div className="w-5/6h-[6%] bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton;
