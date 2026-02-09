import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRemoveAVideoInWatchhistory } from "../Api/UserApi.js";
import HoverVideo from "./HomePage.jsx/HomePageComponent/HoverVideo.jsx";
import VideoInfo from "./HomePage.jsx/HomePageComponent/VideoInfo.jsx";
import VideoMenu from "./HomePage.jsx/HomePageComponent/VideoMenu.jsx";
import { AppContext } from "./utils/contextApi.js";

const Home = ({ v, index, watchedAt }) => {
  const { setChannelOwnerId, sethistory } = useContext(AppContext);
  const navigate = useNavigate();
  const videoref = useRef([]);

  const [isImageIndex, setisImageIndex] = useState(null);

  useEffect(() => {
    if (isImageIndex === v?._id) {
      setChannelOwnerId(v?.owner?._id);
    }
  }, [isImageIndex]);

  const handleDeleteAVideoWatchHistory = async (videoId) => {
    sethistory((prev) => prev.filter((item) => item._id !== videoId));
    const res = await getRemoveAVideoInWatchhistory(videoId);
  };

  const goToVideoPage = (id, userId) =>
    navigate(`/video-rec-page/${id}/user/${userId}`);

  return (
    <div className="h-96 bg-gradient-to-tl from-slate-800 via-black to-slate-800 rounded-xl shadow-md  hover:shadow-lg transition pb-1 hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md   ">
      <HoverVideo
        video={v}
        videoref={videoref}
        onClick={() => goToVideoPage(v._id, v?.owner?._id)}
        isImageIndex={isImageIndex}
        setisImageIndex={setisImageIndex}
        isData={false}
      />

      <div className="flex relative">
        <VideoInfo v={v} index={index} watchedAt={watchedAt} />
        <VideoMenu
          v={v}
          isNested={true}
          index={index}
          handleDeleteAVideoWatchHistory={handleDeleteAVideoWatchHistory}
        />
      </div>
    </div>
  );
};

export { Home };

