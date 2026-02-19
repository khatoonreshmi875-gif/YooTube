import { useState } from "react";
import { useLocation } from "react-router-dom";

import CommentThread from "./watchComment/CommentThread.jsx";

import PlaylistVideo from "./watchSimilarVideo/PlaylistVideo.jsx";
import Mainvideo from "./watchVideo/Mainvideo.jsx";

import SimilarVideo from "./watchSimilarVideo/SimilarVideo.jsx";

const WatchPage = () => {
  const location = useLocation();
  const [fromPlaylist, setFromPlaylist] = useState(!!location?.state?.playlist);
  const { playlist } = location?.state || {};
  const [showComments, setShowComments] = useState(false); // toggle for mobile

  return (
    <div className="min-w-0 w-full  pb-24 ">
      <div className="flex flex-col xl:flex-row break-words gap-4 ">
        {/* Left side: video always */}
        <div className="flex flex-col lg:w-full xl:w-2/3 ">
          <Mainvideo />

          {/* Desktop: always show comments */}
          <div className="xl:block hidden">
            <CommentThread />{" "}
          </div>

          {/* Mobile: toggle between comments and similar videos */}
          <div className="xl:hidden mt-3 ">
            <div className="xl:hidden mt-3">
              <div className="flex">
                <ul className="flex justify-around items-center w-full p-2 bg-white text-slate-700 sm:text-base text-[12px] font-medium border-b border-slate-200 shadow-sm">
                  <li>
                    <button
                      onClick={() => setShowComments(true)}
                      className={`px-3 py-1 rounded-md transition ${
                        showComments
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      Comments
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowComments(false)}
                      className={`px-3 py-1 rounded-md transition ${
                        !showComments
                          ? "bg-blue-50 text-blue-600"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      Similar Videos
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {showComments ? (
              <div>
                <CommentThread />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                {fromPlaylist && (
                  <button
                    onClick={() => setFromPlaylist(false)}
                    className="self-end mb-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    ✕ Close Playlist
                  </button>
                )}
                {fromPlaylist && <PlaylistVideo similarVideos={playlist} />}{" "}
                <SimilarVideo />
              </div>
            )}
          </div>
        </div>

        {/* Right side: only visible on large screens */}
        <div className="hidden xl:flex flex-col mr-2 ">
          {fromPlaylist && (
            <button
              onClick={() => setFromPlaylist(false)}
              className="self-end mb-2 px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-500 transition"
            >
              ✕ Close Playlist
            </button>
          )}
          {fromPlaylist && <PlaylistVideo similarVideos={playlist} />}

          <SimilarVideo />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
