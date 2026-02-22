import { useContext, useEffect, useState } from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistByUsingUserId } from "../../../../Api/Playlistapi.js";
import { AppContext } from "../../../utils/contextApi.js";
import { handleAxiosError, useAxiosErrorHandler } from "../../../utils/erroeHandler.jsx";
import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";
import EmptySkeleton from "../../../utils/EmptySkeleton.jsx";
import PlaylistCard from "../component/PlaylistCard.jsx";

const Playlist = () => {
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [infoPlaylist, setInfoPlaylist] = useState(null);
  const handleAxiosError = useAxiosErrorHandler();

  useEffect(() => {
    const getPlaylistThroughUserId = async (userId) => {
      setLoading(true);
      try {
        const url = await getPlaylistByUsingUserId(userId);
        localStorage.removeItem("playlistid");
        setInfoPlaylist(url.data.data);
      } catch (err) {
        handleAxiosError(err);
      } finally {
        setLoading(false);
      }
    };
    getPlaylistThroughUserId(userId);
  }, [userId]);
  if (infoPlaylist === null) {
    return <LoadingSpinner label="Fetching Playlist" isData={true} />;
  }
  return (
    <>
      {infoPlaylist?.length == 0 ? (
        <div className="bg-white w-fit h-fit mx-auto border-slate-300 shadow-md rounded-lg p-3">
          <EmptySkeleton
            Icon={MdPlaylistPlay}
            button_msg="  Create Playlist"
            msg="   Create your first playlist to get started!"
            heading_text="    No playlists yet"
            onClick={() => navigate("/create-playlist")}
            userId={userId}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2  lg:gap-5 ">
          <PlaylistCard
            infoPlaylist={infoPlaylist}
            userId={userId}
            setInfoPlaylist={setInfoPlaylist}
          />
        </div>
      )}
    </>
  );
};

export default Playlist;
