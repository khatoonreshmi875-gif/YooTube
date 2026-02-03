import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyLIkeVideo = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="flex flex-col h-screen justify-center items-center w-full  text-white">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-14 aspect-square sm:w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L4.5 12.75m0 0L9.75 8.5m-5.25 4.25h15"
            />
          </svg>
          <h1 className="mt-4 sm:text-2xl font-bold text-lg font-serif">
            No Liked Videos Found
          </h1>
          <p className="mt-2 text-gray-400 sm:text-base text-sm font-serif">
            You haven’t liked any videos yet. Start exploring and add some to
            your favorites!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition sm:text-base text-sm"
          >
            Browse Videos
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyLIkeVideo;
