import React, { useCallback, useContext, useState } from "react";
import ShareButon from "../../ShareButon";
import DownloadButton from "../../Download/components/DownloadButton";
import { FaXmark } from "react-icons/fa6";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { handleAxiosError } from "../../utils/erroeHandler";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import ReportPage from "../ReportPage";
import { AppContext } from "../../utils/contextApi";
const VideoMenu = ({ index, v, isNested, handleDeleteAVideoWatchHistory }) => {
  const {user}=useContext(AppContext)
  const [IsOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          onClick={() => setIsOpen(IsOpen === index ? null : index)}
          className="text-2xl ml-auto text-white hover:text-gray-300 transition "
        >
          {IsOpen === index ? <FaXmark /> : <BiDotsVerticalRounded />}
        </button>
      </div>
      {IsOpen === index && (
        <div className="flex flex-col bg-black/80 z-50 text-white absolute  top-9  rounded-md  w-36 shadow-lg right-0 p-2  ">
          <div className=" flex items-center hover:bg-gray-700 px-4 py-2 w-full transition rounded-lg font-serif">
            <ShareButon video={v} isNested={true} />
          </div>
          {handleDeleteAVideoWatchHistory ? (
            <button
              className="flex items-center hover:bg-gray-700 px-4 py-2 w-full transition rounded-lg font-serif"
              onClick={() => {
                const toastId = toast.loading("Deleting video...");
                try {
                  handleDeleteAVideoWatchHistory(v._id);
                  toast.update(toastId, {
                    render: "Video deleted ✅",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000,
                  });
                } catch (err) {
                  handleAxiosError(err, navigate);
                  toast.update(toastId, {
                    render: "Failed to delete ❌",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                  });
                }
              }}
            >
              Delete
            </button>
          ) : (
            <span
              className="flex items-center hover:bg-gray-700 px-4 py-2 w-full transition rounded-lg font-serif"
              onClick={() => setIsOpen(null)}
            >
              <DownloadButton video={v} />
            </span>
          )}
          <div
            className=" flex items-center hover:bg-gray-700 px-4 py-2 w-full transition rounded-lg font-serif"
            onClick={() => navigate(`/report-page/${user._id}`)}
          >
            Report
          </div>
        </div>
      )}
    </>
  );
};

export default VideoMenu;
