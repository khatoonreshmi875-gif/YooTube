import React from 'react'

const EmptyvideoCard = () => {
  return (
    <>
      <div className="flex space-x-5">
        <div className="flex items-center justify-center  md:w-44 md:h-24 w-30 h-20 bg-slate-700/30 rounded-md p-3  ">
          <p className="text-gray-400 font-medium text-xs ">
            No videos available
          </p>
        </div>
        <div className="sm:flex sm:items-center sm:justify-center  md:w-44 md:h-24 w-30 h-20 bg-slate-700/30 rounded-md p-3 hidden   ">
          <p className="text-gray-400 font-medium text-xs ">
            No videos available
          </p>
        </div>
        <div className="sm:flex sm:items-center sm:justify-center  md:w-44 md:h-24 w-30 h-20 bg-slate-700/30 rounded-md p-3 hidden  ">
          <p className="text-gray-400 font-medium text-xs ">
            No videos available
          </p>
        </div>
      </div>
    </>
  );
}

export default EmptyvideoCard
