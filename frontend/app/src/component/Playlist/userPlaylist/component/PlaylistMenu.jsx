import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deletePlaylist, editPlaylist } from "../../../../Api/Playlistapi";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { AppContext } from "../../../utils/contextApi";
import DropDownItem from "../../../HomePage.jsx/HomePageComponent/DropDownItem";
import { toast } from "react-toastify";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PlaylistMenu = ({
  setRefresh,
  playlist,
  refresh,
  index,
  userId,
  setInfoPlaylist,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(null);

  const Deletevideo = async (playlistId) => {
    const toastId = toast.loading("Deleting playlist...");
    try {
      setInfoPlaylist((prev) => prev.filter((p) => p._id !== playlistId));
      await deletePlaylist(playlistId);
      toast.update(toastId, {
        render: "playlist deleted ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      handleAxiosError(err);
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
        className="p-2 rounded-full hover:bg-slate-100  transition duration-200 flex items-start w-fit h-fit"
      >
        {isOpen === index ? (
          <XMarkIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        ) : (
          <EllipsisVerticalIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
        )}
      </button>
      {isOpen === index && (
        <div
          className="absolute right-0 top-14 w-44 
                     bg-white border border-slate-200 
                     rounded-lg shadow-lg py-2 z-50"
        >
          {/* Delete */}

          <DropDownItem
            bg=" text-red-500 hover:bg-red-50  "
            label="Delete"
            onClick={() => {
              Deletevideo(playlist._id);
              setRefresh(!refresh);
            }}
          />

          {userId === user._id && (
            <>
              <DropDownItem
                label=" Add Video"
                onClick={() =>
                  navigate(`/add-playlist/${playlist._id}`, {
                    state: {
                      playlist: playlist,
                    },
                  })
                }
                bg=" text-slate-700 hover:bg-slate-100 "
              />
              <DropDownItem
                label=" Edit"
                onClick={() => {
                  navigate(`/edit-playlist/${playlist._id}`, {
                    state: {
                      playlist: playlist,
                    },
                  });
                }}
                bg=" text-slate-700 hover:bg-slate-100 "
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PlaylistMenu;
