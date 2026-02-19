import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRemoveAVideoInWatchhistory } from "../Api/UserApi.js";
import HoverVideo from "./HomePage.jsx/HomePageComponent/HoverVideo.jsx";
import VideoInfo from "./HomePage.jsx/HomePageComponent/VideoInfo.jsx";
import VideoMenu from "./HomePage.jsx/HomePageComponent/VideoMenu.jsx";
import { AppContext } from "./utils/contextApi.js";

const Home = ({
  v,
  index,
  watchedAt,
  dislikedVideo,
  likedAt,
  isDownload,
  setDownloads,
  handleDeleteAVideoWatchHistory,
}) => {
  const { setChannelOwnerId, sethistory, history } = useContext(AppContext);
  const navigate = useNavigate();
  const videoref = useRef([]);

  const [isImageIndex, setisImageIndex] = useState(null);

  useEffect(() => {
    if (isImageIndex === v?._id) {
      setChannelOwnerId(v?.owner?._id);
    }
  }, [isImageIndex]);

  const goToVideoPage = (id, userId) =>
    navigate(`/video-rec-page/${id}/user/${userId}`);

  return (
    <div
      className={`${isDownload ? "flex flex-row" : ""} bg-white rounded-xl shadow-sm border border-gray-200 
                        hover:shadow-md transition w-full h-full `}
    >
      <HoverVideo
        video={v}
        videoref={videoref}
        onClick={() => goToVideoPage(v._id, v?.owner?._id)}
        isImageIndex={isImageIndex}
        setisImageIndex={setisImageIndex}
        isData={false}
      />

      <div className="flex relative">
        <VideoInfo
          v={v}
          index={index}
          watchedAt={watchedAt}
          dislikedVideo={dislikedVideo}
          likedAt={likedAt}
        />
        <VideoMenu
          v={v}
          isNested={true}
          index={index}
          handleDeleteAVideoWatchHistory={handleDeleteAVideoWatchHistory}
          setDownloads={setDownloads}
        />
      </div>
    </div>
  );
};

export { Home };
