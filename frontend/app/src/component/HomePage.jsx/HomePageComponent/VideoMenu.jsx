import React, { useContext, useState } from "react";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import DownloadButton from "../../Download/components/DownloadButton";
import ShareButon from "../../ShareButon";
import { handleAxiosError } from "../../utils/erroeHandler";
import Delete from "../../utils/Delete.jsx";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/contextApi";
import DropDownItem from "./DropDownItem.jsx";

const VideoMenu = ({
  index,
  v,
  handleDeleteAVideoWatchHistory,
  isDownload,
  setDownloads,
}) => {
  const { user } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const toastId = toast.loading("Deleting video...");
    try {
      // await the delete action (must return a promise)
      await handleDeleteAVideoWatchHistory(v._id);

      toast.update(toastId, {
        render: "Video deleted from watch history successfully✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // optional: close dropdown, refresh list, or update local state
      setIsOpen(null);
      // if you need to navigate or refetch, do it here
    } catch (err) {
      // handleAxiosError is your existing error helper
      handleAxiosError(err, navigate);

      toast.update(toastId, {
        render: "Failed to delete ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="relative">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(isOpen === index ? null : index)}
        className="p-2 rounded-full hover:bg-slate-100 transition duration-200"
      >
        {isOpen === index ? (
          <XMarkIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        ) : (
          <EllipsisVerticalIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen === index && (
        <div
          className="absolute right-0 top-10 w-44 
                     bg-white border border-slate-200 
                     rounded-lg shadow-lg py-2 z-50"
        >
          {/* Share */}
          <DropDownItem
            bg=" text-slate-700 hover:bg-slate-100 "
            label={<ShareButon video={v} isNested={true} />}
          />

          {/* Delete from Watch History */}
          {handleDeleteAVideoWatchHistory ? (
            <DropDownItem
              bg=" text-red-500 hover:bg-red-50  "
              label="   Delete"
              onClick={handleDeleteClick}
            />
          ) : (
            <DropDownItem
              bg=" text-slate-700 hover:bg-slate-100 "
              label={<DownloadButton video={v} />}
              onClick={() => setIsOpen(null)}
            />
          )}
          {setDownloads && (
            <DropDownItem
              bg=" text-red-500 hover:bg-red-50  "
              label={<Delete setDownloads={setDownloads} videoId={v} />}
              onClick={() => setIsOpen(null)}
            />
          )}
          {/* Report */}
          <DropDownItem
            bg=" text-yellow-600 hover:bg-yellow-50 "
            label="Report"
            onClick={() => navigate(`/report-page/${v._id}`)}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(VideoMenu);
