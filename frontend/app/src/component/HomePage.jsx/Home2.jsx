import React, { useCallback, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRemoveAVideoInWatchhistory } from "../../Api/UserApi.js";
import { AppContext } from "../utils/contextApi.js";
import { handleAxiosError } from "../utils/erroeHandler.jsx";
import HoverVideo from "./HomePageComponent/HoverVideo.jsx";
import TweetSection from "./HomePageComponent/TweetSection.jsx";
import VideoInfo from "./HomePageComponent/VideoInfo.jsx";
import VideoMenu from "./HomePageComponent/VideoMenu.jsx";

const Home2 = ({ index, v, s, playlist }) => {
  const { sethistory } = useContext(AppContext);
  const navigate = useNavigate();
  const videoref = useRef([]);
  const [isImageIndex, setIsImageIndex] = useState(null);
  const handleDeleteAVideoWatchHistory = useCallback(
    async (videoId) => {
      try {
        sethistory((prev) => prev.filter((item) => item._id !== videoId));
        const res = await getRemoveAVideoInWatchhistory(videoId);
      } catch (err) {
        console.log("delete a video from watch history failed", err);
        handleAxiosError(err);
      }
    },
    [sethistory],
  );

  const goToPlaylist = (id) => navigate(`/playlist/${id}`);
  const goToVideoPage = (id, userId) =>
    navigate(`/video-rec-page/${id}/user/${userId}`);

  const playingSlot = (index + 1) % 7 === 0;
  const playlistIndex = Math.floor(index / 7); // 👈 correct
  const p = playlist[playlistIndex % playlist.length]; // cycle if needed
  const tweetPost = index === 12;
  return (
    <>
      {index === 12 && (
        <div className="col-span-full my-6">
          <TweetSection />
        </div>
      )}

      <div className="sm:my-6 my-3">
        <div className="w-full h-full sm:px-2">
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 
                        hover:shadow-md transition w-full h-full"
          >
            {/* Video / Thumbnail */}
            {playingSlot ? (
              <HoverVideo
                video={p}
                videoref={videoref}
                onClick={() => goToPlaylist(p._id)}
                isImageIndex={isImageIndex}
                setisImageIndex={setIsImageIndex}
                isData={true}
              />
            ) : (
              <HoverVideo
                video={v}
                videoref={videoref}
                onClick={() => goToVideoPage(v._id, v?.owner?._id)}
                isImageIndex={isImageIndex}
                setisImageIndex={setIsImageIndex}
                isData={false}
              />
            )}

            {/* Video Info */}
            {playingSlot ? (
              <VideoInfo v={p} />
            ) : (
              <div className="flex relative">
                <VideoInfo v={v} />
                <VideoMenu v={v} isNested={true} index={index} />
              </div>
            )}

            {/* Delete Option */}
            {s && (
              <div
                onClick={() => handleDeleteAVideoWatchHistory(s)}
                className="text-sm text-red-500 cursor-pointer px-3 py-2 hover:bg-red-50 rounded-md transition"
              >
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(Home2);
