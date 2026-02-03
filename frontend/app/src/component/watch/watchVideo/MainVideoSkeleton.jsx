const MainVideoSkeleton = () => {
  return (
    <div className="w-full bg-gray-100 rounded-xl shadow-md p-6 animate-pulse sm:space-y-6 sm:h-auto h-44 space-y-3  ">
      {/* Title placeholder */}
      <div className="w-full sm:w-3/4 h-3 sm:h-7 bg-gray-300 rounded-lg"></div>

      {/* Owner + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-300"></div>
          <div className="w-24 sm:w-32 h-2 bg-gray-300 rounded-lg "></div>
        </div>

        <div className="flex sm:space-x-3">
          <div className="w-20 sm:w-24 h-3 bg-gray-300 rounded-lg"></div>
          <div className="w-12 sm:w-14 h-3 bg-gray-300 rounded-lg hidden sm:block"></div>
          <div className="w-12 sm:w-14 h-3 bg-gray-300 rounded-lg hidden sm:block"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap sm:gap-4">
        <div className="w-20 h-2 bg-gray-300 rounded-lg hidden sm:block"></div>
        <div className="w-28 h-2 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Description */}
      <div className="sm:space-y-3">
        <div className="w-full h-2 bg-gray-300 rounded-lg hidden sm:block"></div>
        <div className="w-2/6 h-2 bg-gray-300 rounded-lg hidden sm:block"></div>
        <div className="w-2/3 h-2 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default MainVideoSkeleton;
