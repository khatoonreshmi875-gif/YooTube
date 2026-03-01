import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteVideo } from "../../../Api/VideoApi";
import DropDownItem from "../../HomePage.jsx/HomePageComponent/DropDownItem";
import { AppContext } from "../../utils/contextApi";
import { useAxiosErrorHandler } from "../../utils/erroeHandler";
import useDelete from "../../../Hooks/useDelete";

const VideoMenu = ({ v, index, setDisabledUI }) => {
  const { setvideo, user } = useContext(AppContext);
  const handleAxiosError = useAxiosErrorHandler();

  const { userId } = useParams();
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (v) => {
    setDisabledUI(true); // block UI

    // Optimistic UI update
    setvideo((prev) => prev?.filter((p) => p._id !== v._id));

    // Show loading toast
    const toastId = toast.loading("Deleting video...");

    try {
      const result = await deleteVideo(v._id);

      // Success toast
      toast.update(toastId, {
        render: "Video deleted ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        onClose: () => setDisabledUI(false),
      });
    } catch (err) {
      handleAxiosError(err);

      // Rollback UI
      setvideo((prev) => [...prev.videos, v]);

      // Error toast
      toast.update(toastId, {
        render: "Failed to delete ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        onClose: () => setDisabledUI(false),
      });
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(isOpen === index ? null : index)}
        className=" p-2 rounded-full hover:bg-slate-100 transition duration-200"
      >
        {isOpen === index ? (
          <XMarkIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        ) : (
          <EllipsisVerticalIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        )}
      </button>

      {isOpen === index && (
        <div
          className="flex flex-col bg-white border border-slate-200 
                 z-50 text-slate-700 absolute top-9 right-0 
                 rounded-md w-40 shadow-lg"
        >
          {user._id === userId && (
            <DropDownItem
              bg=" text-slate-700 hover:bg-slate-100 "
              label="Edit"
              onClick={() =>
                navigate("/edit-video", {
                  state: { videoId: v._id, video: v },
                })
              }
              Icon={MdEdit}
            />
          )}

          <DropDownItem
            bg=" text-red-500 hover:bg-red-50  "
            label="   Delete"
            onClick={() => handleDelete(v)}
            Icon={MdDelete}
          />
        </div>
      )}
    </>
  );
};

export default VideoMenu;
