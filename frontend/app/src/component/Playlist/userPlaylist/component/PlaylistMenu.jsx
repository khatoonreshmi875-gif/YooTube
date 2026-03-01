import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePlaylist } from "../../../../Api/Playlistapi";
import DropDownItem from "../../../HomePage.jsx/HomePageComponent/DropDownItem";
import { AppContext } from "../../../utils/contextApi";
import { useAxiosErrorHandler } from "../../../utils/erroeHandler";
import useDelete from "../../../../Hooks/useDelete";

const PlaylistMenu = ({
  setRefresh,
  playlist,
  refresh,
  index,
  userId,
  setInfoPlaylist,
  setDisabledUI,
  disabledUI,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(null);

  const handleAxiosError = useAxiosErrorHandler();
  const addPlaylistBack = () => setInfoPlaylist((prev) => [...prev, playlist]);

  const { handleDelete } = useDelete({
    v: playlist,
    setItems: setInfoPlaylist,
    fallbackLogic: addPlaylistBack,
    deleteFn: deletePlaylist,
    setDisabledUI: setDisabledUI,
  });

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
              handleDelete(playlist);
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
      {disabledUI && (
        <div className="fixed inset-0  z-50 cursor-not-allowed "></div>
      )}
    </>
  );
};

export default PlaylistMenu;
