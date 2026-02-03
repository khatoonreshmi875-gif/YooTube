import React from 'react'

const TweetSkeleton = () => {
  return (
    <>
      {" "}
      <div className="w-1/2 mx-auto bg-gray-200 h-[40rem] rounded-lg animate-pulse p-4">
        <div className="flex items-center p-4 border-b border-gray-400">
          <div className="h-20 w-20 bg-gray-300 rounded-full"></div>
          <div className="ml-4 py-4 space-y-4">
            <p className="bg-gray-300 w-40 h-4 rounded-lg"></p>
            <p className="bg-gray-300 w-40 h-4 rounded-lg"></p>
          </div>
        </div>
        <div className="p-4 bg-gray-300 w-full h-2 py-3 my-3 rounded-lg"></div>
        <div className="w-11/12 mx-auto h-[20rem] bg-gray-300 rounded-lg my-9"></div>
        <div className="flex">
          <p className="bg-gray-300 w-28 h-4 rounded-lg mx-6"></p>
          <p className="bg-gray-300 w-28 h-4 rounded-lg"></p>
        </div>
      </div>
    </>
  );
}

export default TweetSkeleton
