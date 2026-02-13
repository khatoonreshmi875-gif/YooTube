import { useContext } from "react";
import { AppContext } from "./utils/contextApi.js";

import { useNavigate } from "react-router-dom";
import DownloadButton from "../component/Download/components/DownloadButton.jsx";
import VideoMenu from "./HomePage.jsx/HomePageComponent/VideoMenu.jsx";

const Layout = ({
  s,
  index,
  likedAt,
  func,
  key,
  isDownload,
  dislikedVideo,
  setDownloads,
}) => {
  const { FormatTime } = useContext(AppContext);
  const formatdate = (date) => {
    const dateobj = new Date(date);
    const day = dateobj.toLocaleString();
    return day;
  };

  const navigate = useNavigate();
  const handleVideoPage = async (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`);
  };

  return (
    <div>
      <div
        className={`${
          isDownload
            ? "flex sm:flex-row flex-col"
            : "flex sm:flex-col xs:h-[28rem] h-[24rem] sm:h-[32rem] mb-6"
        }
      bg-gradient-to-tl from-slate-800 via-black to-slate-800
      rounded-xl shadow-md hover:shadow-lg transition
      hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950
      shadow-blue-200 hover:shadow-blue-300 sm:pb-0 space-x-4`}
      >
        {/* Video Section */}
        <div onClick={() => handleVideoPage(s._id, s?.owner?._id)}>
          <video
            muted
            poster={s?.thumbnail}
            className={`${
              isDownload
                ? "md:w-96 sm:w-52 sm:h-36 w-full aspect-video flex-shrink-0"
                : "w-full aspect-video"
            }
          rounded-xl object-cover cursor-pointer
          hover:brightness-90 transition duration-200`}
          >
            <source src={s?.videoFile} type="video/mp4" />
          </video>
        </div>

        {/* Info Section */}
        <div className="flex relative justify-between w-full">
          <div
            className={`flex flex-col sm:mx-4 justify-center w-full ${
              isDownload ? "space-y-3" : "sm:space-y-6 space-y-2"
            }`}
          >
            {/* Channel Avatar + Name */}
            <div className="flex items-center">
              <button onClick={() => navigate(`/curr-user/${userId}/video`)}>
                <div className="h-11 w-11 rounded-full mr-2 hover:scale-105 transition-transform duration-200">
                  <img
                    className="h-full w-full rounded-full object-cover border-2 border-white"
                    src={s?.owner?.avatar}
                    alt="Channel Avatar"
                  />
                </div>
              </button>
              <p className="sm:text-sm text-xs font-medium font-serif text-white cursor-pointer hover:underline">
                {s?.owner?.channelName}
              </p>
            </div>

            {/* Video Title */}
            <p
              className={`font-semibold text-white font-serif cursor-pointer hover:underline hover:text-cyan-700 transition-colors duration-200 ${
                isDownload
                  ? "md:text-base text-lg line-clamp-2"
                  : "md:text-lg text-sm"
              }`}
            >
              {s?.title}
            </p>

            {/* Views + Time */}
            <div className="flex text-xs italic space-x-4 text-gray-300 font-sans">
              <p>{s?.views} views</p>
              <p>{FormatTime(s?.createdAt)}</p>
            </div>

            {/* Description */}
            <p className="line-clamp-1 sm:text-sm text-xs text-gray-200 font-serif">
              {s?.description}
            </p>

            {/* Like/Dislike Section */}
            <div className="flex justify-between my-3">
              {likedAt && (
                <small className="block text-[11px] text-gray-300 italic">
                  Liked on {formatdate(likedAt)}
                </small>
              )}
              {!isDownload && (
                <button
                  className="bg-cyan-800 text-xs sm:text-sm text-white rounded-lg px-3 py-1 font-serif shadow-md hover:opacity-80 active:shadow-slate-900"
                  onClick={() => dislikedVideo(s?._id)}
                >
                  Dislike
                </button>
              )}
            </div>
          </div>

          {/* Video Menu */}
          <div>
            {!dislikedVideo && (
              <VideoMenu
                index={index}
                v={s}
                isDownload={true}
                setDownloads={setDownloads}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
