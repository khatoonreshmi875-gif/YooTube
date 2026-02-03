import React from "react";
import { useNavigate } from "react-router-dom";
import { deletePlaylist, editPlaylist } from "../../../../Api/Playlistapi";
import { handleAxiosError } from "../../../utils/erroeHandler";

const PlaylistMenu = ({ isOpen, setRefresh, playlist, refresh, index }) => {
  const navigate = useNavigate();
  const Deletevideo = async (playlistId) => {
    try {
      await deletePlaylist(playlistId);
    } catch (err) {
      handleAxiosError(err, navigate);
      console.log("delete playlist error", err);
    }
  };

  return (
    <>
      {" "}
      {isOpen === index && (
        <div className="flex flex-col bg-black/50 z-50 text-white absolute  right-0  rounded-md  w-36 shadow-lg">
          <div
            onClick={() => {
              Deletevideo(playlist._id);
              setRefresh(!refresh);
            }}
            className="text-white font-bold mx-4 cursor-pointer w-fit p-4 items-star+t"
          >
            Delete
          </div>
          <div
            onClick={() =>
              navigate(`/add-playlist/${playlist._id}`, {
                state: {
                  playlist: playlist,
                },
              })
            }
            className="text-white font-bold mx-4 cursor-pointer w-fit p-4"
          >
            Add Video
          </div>
          <div
            onClick={() => {
              navigate(`/edit-playlist/${playlist._id}`, {
                state: {
                  playlist: playlist,
                },
              });
            }}
            className="text-white font-bold mx-4 cursor-pointer w-fit p-4"
          >
            Edit
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistMenu;
