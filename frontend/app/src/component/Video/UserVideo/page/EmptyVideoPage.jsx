import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/contextApi";

const EmptyVideoPage = ({ userId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center justify-center h-96   bg-gradient-to-bl from-black via-slate-800 to-black shadow-md text-white rounded-lg w-fit mx-auto mt-9">
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
          d="M15 10l4.553 2.276a1 1 0 010 1.789L15 17.333V10zM4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6"
        />
      </svg>
      <h2 className="sm:text-xl text-sm font-semibold text-gray-300">
        No videos available
      </h2>
      <p className="text-gray-400 mt-2 text-center px-4 sm:text-base text-xs" >
        You haven’t uploaded any videos yet. Start by creating your first video!
      </p>
      {userId === user._id ? (
        <button
          onClick={() => navigate("/upload-video")}
          className="mt-6 px-6 py-2 bg-blue-100 text-gray-900 rounded-lg hover:bg-blue-700 transition-colors duration-200 sm:text-base text-xs"
        >
          Upload Video
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmptyVideoPage;
