import React from "react";
import { toast } from "react-toastify";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { deleteVideoFromPlaylist } from "../../../../Api/Playlistapi";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
const VideoCard = ({ allPlaylist, setallPlaylist, p }) => {
  const navigate = useNavigate();
  const Deletevideo = async (playlistId, videoId) => {
    const toastId = toast.loading("Deleting video...");
    try {
      setallPlaylist((prev) => ({
        ...prev,
        playlist: {
          ...prev.playlist,
          videos: Array.isArray(prev?.playlist?.videos)
            ? prev?.playlist?.videos?.filter((p) => p._id !== videoId)
            : [],
        },
      }));

      await deleteVideoFromPlaylist(playlistId, videoId);
      // Success toast
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
  };

  const handleVideoPage = async (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`, {
      state: {
        playlist: allPlaylist?.playlist?.videos,
      },
    });
  };

  return (
    <div
      key={p._id}
      className="bg-gradient-to-tr from-cyan-950 via-black to-cyan-950  shadow-md shadow-blue-100 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
    >
      <img
        onClick={() => {
          handleVideoPage(p?._id, p?.owner);
        }}
        src={p.thumbnail}
       
        alt={p.title}
        className="aspect-video w-full object-cover"
      />
      <div className="p-4">
        <p className="md:text-lg font-semibold  text-sm font-serif text-white">
          {p.title}
        </p>
        <p className="sm:text-sm text-xs text-white line-clamp-2">
          {p.description}
        </p>
        <p className="text-xs text-gray-200 mt-1 italic ">
          {formatDate(p.createdAt)}
        </p>
        <button
          onClick={() => Deletevideo(allPlaylist?.playlist?._id, p._id)}
          className="mt-3 bg-red-600 font-bold hover:bg-red-800 transition duration-150 font-serif px-1 text-white rounded-md text:xs sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
