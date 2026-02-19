import React from "react";
import { toast } from "react-toastify";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { deleteVideoFromPlaylist } from "../../../../Api/Playlistapi";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";
import Button from "../../../Tweet/UserTweet/Button";
import VideoInfo from "../../../HomePage.jsx/HomePageComponent/VideoInfo";
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
      className="bg-white shadow-sm shadow-slate-400 rounded-lg overflow-hidden hover:shadow-lg transition duration-200"
    >
      <img
        onClick={() => {
          handleVideoPage(p?._id, p?.owner);
        }}
        src={p.thumbnail}
        alt={p.title}
        className="aspect-video w-full object-cover"
      />

      <div className="flex justify-between">
        <VideoInfo v={p} showImage={false} />
        <div className="m-3">
          <Button
            onClick={() => Deletevideo(allPlaylist?.playlist?._id, p._id)}
            label=" Delete"
            bg="bg-red-100 text-red-600 hover:bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
