import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete, MdEdit } from "react-icons/md";
import { AppContext } from "../../utils/contextApi";
import { deleteVideo } from "../../../Api/VideoApi";
import { handleAxiosError } from "../../utils/erroeHandler";

const VideoMenu = ({ v, isOpen, index }) => {
  const { setvideo, user } = useContext(AppContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async (v) => {
    // Optimistic UI update
    setvideo((prev) => prev.videos.filter((p) => p._id !== v._id));

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
      handleAxiosError(err, navigate);

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
  console.log(user._id, userId, user._id === userId);
  return (
    <>
      {" "}
      {isOpen === index && (
        <div className="flex flex-col bg-black/70 z-50 text-white absolute  top-9  rounded-md  w-36 shadow-lg right-0">
          {user._id === userId && (
            <button
              onClick={() =>
                navigate("/edit-video", {
                  state: {
                    videoId: v._id,
                    video: v,
                  },
                })
              }
              className="flex items-center hover:bg-gray-700 px-4 py-2 w-full transition"
            >
              <MdEdit className="text-lg mr-2" />
              Edit
            </button>
          )}
          <button
            onClick={() => handleDelete(v)}
            className="flex items-center hover:bg-gray-700 px-4  py-1 w-full transition"
          >
            <MdDelete className="text-lg mr-2" />
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default VideoMenu;
