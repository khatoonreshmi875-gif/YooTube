import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/contextApi.js";
import { handleAxiosError } from "../utils/erroeHandler.jsx";
import Videoskeleton from "../Video/Videoskeleton.jsx";
import { Home2 } from "./Home2.jsx";
import NoMoreVideoMessage from "./HomePageComponent/NoMoreVideoMessage.jsx";
const Home1 = () => {
  const { getvideo, hasNomore, allPlaylist, load, loading, getallvideo } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        await getallvideo(0);
      } catch (error) {
        handleAxiosError(error, navigate);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div>
      {getvideo && getvideo.length > 0 ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-2 ">
          {getvideo.map((v, index) => (
            <Home2 key={index} v={v} index={index} playlist={allPlaylist} />
          ))}
          {hasNomore && <NoMoreVideoMessage />}
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  p-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
      {loading && (
        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  p-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
      {load && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  p-2  ">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home1;
