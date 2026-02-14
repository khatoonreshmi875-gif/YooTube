import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyTweetPage = ({ userId,user }) => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-bl from-black via-slate-800 to-black shadow-md text-white rounded-lg w-fit mx-auto mt-9">
        <svg
          className="w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
          />
        </svg>
        <h2 className="sm:text-xl text-sm  font-semibold">
          No tweets available
        </h2>
        <p className="text-gray-400 mt-2 text-center px-4 sm:text-base text-xs">
          This channel hasn’t posted any tweets yet. Check back later or explore
          other content!
        </p>
        {userId === user ? (
          <button
            onClick={() => navigate("/create-tweet")}
            className="mt-6 px-6 py-2 bg-blue-100 text-gray-900 rounded-lg hover:bg-blue-700 transition-colors duration-200 sm:text-base text-xs"
          >
            Create Tweet
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EmptyTweetPage;
