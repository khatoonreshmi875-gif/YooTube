import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyWatchHistory = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" w-full   flex  items-center justify-center h-screen  ">
        {" "}
        <div className="w-full  flex flex-col items-center  ">
          <div className="sm:w-20  w-16 aspect-square flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <h2 className="sm:text-xl font-semibold text-gray-700 text:lg">
            No Watch History
          </h2>
          <p className="text-gray-500 mt-2 max-w-sm text-center sm:text-base text-sm ">
            You haven’t watched any videos yet. Start exploring and your history
            will appear here.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition sm:text-base text-sm"
            onClick={() => navigate("/")}
          >
            Explore Videos
          </button>
        </div>
      </div>
    </>
  );
};

export default EmptyWatchHistory;
