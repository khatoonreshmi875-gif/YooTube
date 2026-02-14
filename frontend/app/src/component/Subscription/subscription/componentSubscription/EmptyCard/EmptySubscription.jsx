import React from "react";
import { useNavigate } from "react-router-dom";

const EmptySubscription = ({ userId, user }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-bl from-black via-slate-800 to-black w-fit mx-auto text-white rounded-lg shadow-md mt-9">
        <svg
          className="w-16 h-16 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <h2 className="sm:text-xl text-sm  font-semibold">
          No subscriptions yet
        </h2>
        <p className="text-gray-400 mt-2 text-center px-4 sm:text-base text-xs">
          You haven’t subscribed to any channels. Discover creators and
          subscribe to stay updated!
        </p>
        {userId === user ? (
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-2 bg-blue-100 text-gray-900 rounded-lg hover:bg-blue-700 transition-colors duration-200 sm:text-base text-xs"
          >
            Explore Channels
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EmptySubscription;
