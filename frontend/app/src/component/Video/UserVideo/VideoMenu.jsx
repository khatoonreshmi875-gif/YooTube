import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { AppContext } from "../../utils/contextApi";
import { deleteVideo } from "../../../Api/VideoApi";
import { handleAxiosError } from "../../utils/erroeHandler";
import DropDownItem from "../../HomePage.jsx/HomePageComponent/DropDownItem";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const VideoMenu = ({ v, index }) => {
  const { setvideo, user } = useContext(AppContext);
  const { userId } = useParams();
  const [isOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (v) => {
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
      });

      console.log(result.data); // Now this will log correctly
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
      });
    }
  };
  return (
    <>
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
