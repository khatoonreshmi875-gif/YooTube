import { useState, useEffect } from "react";
import { getPlaylistByPlaylistId } from "../../../../Api/Playlistapi.js";
import VideoCard from "../component/VideoCard.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";
import PlaylistHeader from "../component/PlaylistHeader.jsx";
const PlaylistVideoPage = () => {
  const [allPlaylist, setallPlaylist] = useState({});

  const navigate = useNavigate();
  const { playlistId } = useParams();

  const handle = async (playlistId) => {
    try {
      const result = await getPlaylistByPlaylistId(playlistId);
      setallPlaylist(result.data.data);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  useEffect(() => {
    handle(playlistId);
  }, []);

  return (
    <div className=" min-h-screen  bg-gradient-to-br from-slate-800 via-black to-slate-800 m-4 rounded-lg p-4 hover:from-black hover:via-slate-800 hover:to-black shadow-sm shadow-blue-200 hover:shadow-blue-300 hover:shadow-md pt-28 pb-24  ">
      <PlaylistHeader allPlaylist={allPlaylist} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allPlaylist?.playlist?.videos?.map((p, index) => (
          <VideoCard
            allPlaylist={allPlaylist}
            setallPlaylist={setallPlaylist}
            p={p}
            key={p._id || index}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistVideoPage;
