import React from 'react'

const EmptyvideoCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 w-full">
      {/* Show 3 placeholders to match video card grid */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center 
                     w-40 sm:w-44 h-24 bg-white border border-slate-200 
                     rounded-lg shadow-sm p-3 hover:shadow-md transition"
        >
          <p className="text-slate-400 font-medium text-xs text-center">
            No videos available
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmptyvideoCard;
