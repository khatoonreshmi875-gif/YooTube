import { CloudArrowDownIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const EmotyDownloadSkeleton = () => {
  const navigate = useNavigate();
  <EmptySkeleton
    Icon={CloudArrowDownIcon}
    button_msg="  Browse Videos"
    msg="  Start exploring and save your favorite videos here."
    heading_text="  No videos downloaded yet"
    onClick={() => navigate("/")}
    userId={user._id}
  />;
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon */}
        <div
          className="w-16 h-16 flex items-center justify-center 
                        rounded-full bg-blue-50"
        >
          <CloudArrowDownIcon className="w-8 h-8 text-blue-600" />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
          No videos downloaded yet
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-500 max-w-sm">
          Start exploring and save your favorite videos here.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-5 py-2.5 
                     bg-blue-600 hover:bg-blue-700 
                     text-white text-sm font-medium 
                     rounded-lg transition duration-200"
        >
          Browse Videos
        </button>
      </div>
    </div>
  );
};

export default EmotyDownloadSkeleton;
