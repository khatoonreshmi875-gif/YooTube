import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPlaylistByPlaylistId } from "../../../../Api/Playlistapi.js";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";

import VideoCard from "../component/VideoCard.jsx";
import PlaylistHeader from "../component/PlaylistHeader.jsx";
import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";

const PlaylistVideoPage = () => {
  // useState
  const [allPlaylist, setAllPlaylist] = useState({});
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();
  const { playlistId } = useParams();

  // Fetch playlist data

  const fetchPlaylist = async (playlistId) => {
    setLoading(true);
    try {
      const result = await getPlaylistByPlaylistId(playlistId);
      setAllPlaylist(result.data.data);
    } catch (err) {
      handleAxiosError(err, navigate);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlaylist(playlistId);
  }, []);

  // Load playlist on mount

  if (loading) {
    return (
      <div className="mt-96">
        <LoadingSpinner label="Fetching playlist videos" />
      </div>
    );
  }
  return (
    <div className=" min-h-screen  bg-gradient-to-br from-slate-800 via-black to-slate-800 sm:m-4 rounded-lg  hover:from-black hover:via-slate-800 hover:to-black shadow-sm shadow-blue-200 hover:shadow-blue-300 hover:shadow-md pb-24  ">
      {/* Playlist Header */}
      <PlaylistHeader allPlaylist={allPlaylist} />

      {/* Playlist Videos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {allPlaylist?.playlist?.videos?.map((p, index) => (
          <VideoCard
            allPlaylist={allPlaylist}
            setallPlaylist={setAllPlaylist}
            p={p}
            key={p._id || index}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideoPage;
