import { useCallback, useContext, useRef, useState } from "react";
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
        handleAxiosError(err, navigate);
      }
    },
    [sethistory, navigate],
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

      <div className="my-6 ">
        <div className="w-full h-full px-2 ">
          <div className="bg-gradient-to-tl from-slate-800 via-black to-slate-800  rounded-lg  hover:shadow-lg transition-shadow duration-300  hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md w-full shadow-md h-full">
            {/* Video / Thumbnail */}{" "}
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
            {/* Video Info for single video */}
            {playingSlot ? (
              <VideoInfo v={p} />
            ) : (
              <div className="flex relative">
                <VideoInfo v={v} />
                <VideoMenu v={v} isNested={true} index={index} />
              </div>
            )}
            {s && (
              <div onClick={() => handleDeleteAVideoWatchHistory(s)}>
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export { Home2 };

