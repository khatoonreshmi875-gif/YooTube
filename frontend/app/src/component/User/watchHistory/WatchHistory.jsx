import { useContext, useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import {
  clearAllWatchhistory,
  getRemoveAVideoInWatchhistory,
} from "../../../Api/UserApi.js";
import { Home } from "../../Home.jsx";
import { AppContext } from "../../utils/contextApi.js";
import EmptySkeleton from "../../utils/EmptySkeleton.jsx";
import Videoskeleton from "../../utils/Videoskeleton.jsx";
import Button from "../../Tweet/UserTweet/Button.jsx";
import { useNavigate } from "react-router-dom";

const WatchHistory = () => {
  const { history, user, sethistory, loading } = useContext(AppContext);

  const navigate = useNavigate();

  const handleDeleteAVideoWatchHistory = async (videoId) => {
    console.log("run");
    console.log("data of history", history);
    sethistory((prev) => prev.filter((item) => item.videoId._id !== videoId));
    const res = await getRemoveAVideoInWatchhistory(videoId);
  };

  const handleDeleteWatchhistory = async () => {
    sethistory([]);
    const res = await clearAllWatchhistory();
  };
  if (history.length === 0) {
    // data fetched but no videos
    return (
      <div className="bg-white flex  w-full h-full justify-center items-center">
        <EmptySkeleton
          Icon={MdHistory}
          button_msg="  Browse Videos"
          msg="  You haven’t watched any videos yet. Start exploring and your history
            will appear here. "
          heading_text=" No Watch History"
          onClick={() => navigate("/")}
          userId={user._id}
        />
      </div>
    );
  }
  console.log("history", history);
  return (
    <div className="min-h-screen bg-slate-50 mt-2 pb-16">
      <div className=" mx-auto px-6 space-y-6">
        {/* Header + Delete Button */}

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-900">
            Watch History
          </h2>
          <Button
            onClick={handleDeleteWatchhistory}
            label=" Clear History"
            bg="bg-red-100 text-red-600 hover:bg-red-600"
          />
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <Videoskeleton key={i} />)
            : history.map((v, index) => (
                <Home
                  key={index}
                  v={v.videoId}
                  index={index}
                  watchedAt={v.watchedAt}
                  s={v._id}
                  handleDeleteAVideoWatchHistory={
                    handleDeleteAVideoWatchHistory
                  }
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default WatchHistory;
