import React from "react";

const StatCard = ({ bg, stats, textColor }) => {
  return (
    <div
      className="w-full bg-white border border-slate-200 rounded-2xl shadow-sm 
               hover:shadow-md transition-transform duration-200 
               hover:scale-[1.02] p-5 space-y-4"
    >
      {/* Total Likes */}
      <div className="flex justify-between items-center">
        <span className="text-slate-600 text-xs sm:text-base font-medium">
          ❤️ Total Likes
        </span>
        <p className="text-cyan-700  font-semibold text-xs sm:text-base">
          {stats?.VideoAllLike?.toLocaleString() || 0}
        </p>
      </div>

      {/* Total Comments */}
      <div className="flex justify-between items-center">
        <span className="text-slate-600 text-xs sm:text-base font-medium">
          💬 Total Comments
        </span>
        <p className="text-cyan-700  font-semibold text-xs sm:text-base">
          {stats?.AllComment?.toLocaleString() || 0}
        </p>
      </div>

      {/* Total Subscribers */}
      <div className="flex justify-between items-center">
        <span className="text-slate-600  text-xs sm:text-base font-medium">
          👥 Total Subscribers
        </span>
        <p className="text-cyan-700  font-semibold text-xs sm:text-base">
          {stats?.user?.subscriberCount?.toLocaleString() || 0}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
