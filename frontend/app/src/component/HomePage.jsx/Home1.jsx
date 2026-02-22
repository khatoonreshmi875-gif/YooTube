import { useContext, useEffect } from "react";
import { AppContext } from "../utils/contextApi.js";
import Home2 from "./Home2.jsx";
import { MdVideoLibrary } from "react-icons/md";
import Videoskeleton from "../utils/Videoskeleton.jsx";
import EmptySkeleton from "../utils/EmptySkeleton.jsx";
import { useLocation } from "react-router-dom";
import { useAxiosErrorHandler } from "../utils/erroeHandler.jsx";
const Home1 = () => {
  const {
    getvideo,
    hasNomore,
    allPlaylist,
    load,
    loading,
    getallvideo,
    hasFetchedFirst,
    token,
  } = useContext(AppContext);
  const location = useLocation();
  const handleAxiosError = useAxiosErrorHandler();

  useEffect(() => {
    // Prefetch likely next routes
    import("../watch/WatchPage.jsx");
    import("../Video/Search/SearchPage.jsx");
  }, []);

  useEffect(() => {
    getallvideo(0).catch((err) => {
      console.error("Video fetch failed:", err);
      // use your custom error handler for JWT/session issues
      handleAxiosError(err);
      // optionally show a local message
    });

    hasFetchedFirst.current = true;
  }, [token]);
  return (
    <div>
      {getvideo && getvideo.length > 0 ? (
        <>
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:gap-3  ">
            {getvideo.map((v, index) => (
              <Home2 key={v._id} v={v} index={index} playlist={allPlaylist} />
            ))}
          </div>{" "}
          {hasNomore.current === true && (
            <div className="w-full">
              <EmptySkeleton
                Icon={MdVideoLibrary}
                msg=" You’ve reached the end of your feed. Check back later for fresh
          content or explore other sections."
                heading_text="  No videos available"
              />
            </div>
          )}
        </>
      ) : (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  ">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
      {loading && (
        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3  ">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
      {load && (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 ">
          {Array.from({ length: 9 }).map((_, i) => (
            <Videoskeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home1;
