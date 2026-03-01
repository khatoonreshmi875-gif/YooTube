import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DownloadButton from "../../Download/components/DownloadButton";
import ShareButon from "../../ShareButon";
import { AppContext } from "../../utils/contextApi";
import Delete from "../../utils/Delete.jsx";
import { useAxiosErrorHandler } from "../../utils/erroeHandler";
import DropDownItem from "./DropDownItem.jsx";
import useDelete from "../../../Hooks/useDelete.jsx";
import { getRemoveAVideoInWatchhistory } from "../../../Api/UserApi.js";

const VideoMenu = ({
  index,
  v,
  handleDeleteAVideoWatchHistory,
  isDownload,
  setDownloads,
}) => {
  const { user, sethistory } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(null);
  const [disabledUI, setDisabledUI] = useState(false);
  const navigate = useNavigate();

  const addVideoBack = () => sethistory((prev) => [...prev, v]);

  const { handleDelete } = useDelete({
    v: v,
    setItems: sethistory,
    fallbackLogic: addVideoBack,
    deleteFn: getRemoveAVideoInWatchhistory,
    setDisabledUI: setDisabledUI,
    open: true,
  });

  return (
    <>
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
                onClick={handleDelete}
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
      {disabledUI && (
        <div className="fixed inset-0 bg-white/30 bg-opacity-30 z-50 cursor-not-allowed"></div>
      )}
    </>
  );
};

export default VideoMenu;
