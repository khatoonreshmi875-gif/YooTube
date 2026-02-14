import { useContext, useEffect, useState } from "react";
import { clearAllWatchhistory } from "../../../Api/UserApi.js";
import { AppContext } from "../../utils/contextApi.js";
import { Home } from "../../Home.jsx";
import Videoskeleton from "../../Video/Videoskeleton.jsx";
import EmptyWatchHistory from "./EmptyWatchHistory.jsx";

const WatchHistory = () => {
  const { history, allHistory, setallHistory, sethistory } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with actual API call if needed)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteWatchhistory = async () => {
    sethistory([]);
    const res = await clearAllWatchhistory();
  };
  
  return (
    <>
      <div className=" w-full  flex flex-col  min-h-screen">
        {history.length === 0 && <EmptyWatchHistory />}

        {history.length !== 0 && (
          <button
            className=" 
               bg-red-600 text-white  w-full mt-3 p-3 rounded-lg shadow-md shadow-red-200 active:bg-slate-900"
            onClick={handleDeleteWatchhistory}
          >
            Delete WatchHistory
          </button>
        )}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 sm:space-x-5 space-y-5 pt-3 pb-20 ">
          {loading ? (
            // Skeleton loader
            <>
              {" "}
              {Array.from({ length: 9 }).map((_, i) => (
                <Videoskeleton key={i} />
              ))}
            </>
          ) : (
            history.map((v, index) => {
              return (
                <Home
                  key={index}
                  v={v.videoId}
                  index={index}
                  watchedAt={v.watchedAt}
                  s={v._id}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default WatchHistory;
