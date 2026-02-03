import React from "react";

const NoMoreVideoMessage = () => {
  return (
    <>
      {" "}
      <div className="w-full flex flex-col items-center justify-center py-12">
        {/* Icon */}
        <div className="sm:w-24 w-16 aspect-square  flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg mb-6">
          <svg
            className="w-12 h-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17v-6h13M9 11l-4 4m0 0l4 4m-4-4h13"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="sm:text-2xl text-lg font-bold text-gray-500 mb-2">
          No more videos
        </h2>
        <p className="text-gray-500 text-center max-w-md">
          You’ve reached the end of your feed. Check back later for fresh
          content or explore other sections.
        </p>
      </div>
    </>
  );
};

export default NoMoreVideoMessage;
