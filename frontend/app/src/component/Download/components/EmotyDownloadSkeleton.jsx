import {
  CloudArrowDownIcon
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const EmotyDownloadSkeleton = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className=" flex justify-center sm:items-center space-y-4 h-screen">
        <div className="flex justify-center flex-col items-center ">
          <div className="text-5xl text-white ">
            <CloudArrowDownIcon />
          </div>
          <p className="text-lg font-semibold text-gray-200 sm:text-xl">
            No videos downloaded yet
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            Start exploring and save your favorites here!
          </p>
          <button className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition sm:text-base text-sm" onClick={()=>navigate("/")}>
            Browse Videos
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default EmotyDownloadSkeleton;
