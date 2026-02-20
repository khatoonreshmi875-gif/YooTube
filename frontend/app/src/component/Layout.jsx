import { useContext } from "react";
import { AppContext } from "./utils/contextApi.js";

import { useNavigate } from "react-router-dom";
import VideoMenu from "./HomePage.jsx/HomePageComponent/VideoMenu.jsx";
import VideoInfoColumn from "./VideoInfoColumn.jsx";

const Layout = ({
  v,
  index,
  isDownload,
  setDownloads,
}) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  const formatdate = (date) => new Date(date).toLocaleString();

  const handleVideoPage = (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`);
  };

  return (
    <div
      className={`flex bg-white  rounded-xl shadow-sm border border-gray-200 
                        hover:shadow-md transition w-full h-full `}
    >
      <div onClick={() => handleVideoPage(v._id, v?.owner?._id)} className="basis-2/6">
        <video
          muted
          poster={v?.thumbnail}
          className={`w-full
          rounded-xl object-cover cursor-pointer
          hover:brightness-90 transition duration-200`}
        >
          <source src={v?.videoFile} type="video/mp4" />
        </video>
      </div>

      <div className="flex relative basis-4/6">
        <VideoInfoColumn v={v} index={index} isDownload={isDownload} />
        <VideoMenu
          v={v}
          isNested={true}
          index={index}
          isDownload={isDownload}
          setDownloads={setDownloads}
        />
      </div>
    </div>
  );
};

export default Layout;
