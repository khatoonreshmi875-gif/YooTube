import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistByUsingUserId } from "../../../../Api/Playlistapi.js";
import { AppContext } from "../../../utils/contextApi.js";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";
import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";
import EmptyPlaylist from "../component/EmptyPlaylist.jsx";
import PlaylistCard from "../component/PlaylistCard.jsx";

const Playlist = () => {
  const { user } = useContext(AppContext);

  const [loading, setLoading] = useState();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [infoPlaylist, setInfoPlaylist] = useState([]);
  useEffect(() => {
    const getPlaylistThroughUserId = async (userId) => {
      setLoading(true);
      try {
        const url = await getPlaylistByUsingUserId(userId);
        localStorage.removeItem("playlistid");
        setInfoPlaylist(url.data);
      } catch (err) {
        handleAxiosError(err, navigate);
      } finally {
        setLoading(false);
        console.log("setloading", loading);
      }
    };
    getPlaylistThroughUserId(user._id);
  }, [user]);
  if (loading) {
    return <LoadingSpinner label="Fetching Playlist" isData={true} />;
  }
  return (
    <>
      {infoPlaylist?.data?.length == 0 ? (
        <EmptyPlaylist userId={userId} user={user._id} />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 space-y-4 w-full  ">
          <PlaylistCard infoPlaylist={infoPlaylist} userId={userId} />
        </div>
      )}
    </>
  );
};

export default Playlist;
