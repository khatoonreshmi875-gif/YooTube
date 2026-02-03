import React from "react";

const Videoskeleton = () => {
  return (
    <>
      <div> 
        <div className="w-full h-auto  my-4 rounded-lg bg-slate-100 shadow-md py-3 ">
          <div className="px-4 py-4">
            <div className="w-full xs:h-72 h-48 bg-gray-300 animate-pulse rounded-lg" />
          </div>
          <div className="flex w-5/6 my-3 px-4 ">
            <div className="xs:w-16 xs:h-16 h-12 w-12 bg-gray-300 animate-pulse rounded-full" />
            <div className="flex-1 ml-3 space-y-2">
              <div className="w-3/4 xs:h-5 h-2 bg-gray-300 animate-pulse rounded" />
              <div className="w-1/2 xs:h-4 h-2 bg-gray-300 animate-pulse rounded" />
              <div className="flex space-x-4">
                <div className="w-16 xs:h-4 h-2 bg-gray-300 animate-pulse rounded" />
                <div className="w-24 xs:h-4 h-2 bg-gray-300 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videoskeleton;
