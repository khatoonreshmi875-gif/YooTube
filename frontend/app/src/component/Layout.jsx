import { useContext } from "react";
import { AppContext } from "./utils/contextApi.js";

import { useNavigate } from "react-router-dom";
import Delete from "./utils/Delete.jsx";

const Layout = ({
  s,
  index,
  likedAt,
  func,
  key,
  isDownload,
  dislikedVideo,
  setDownloads
}) => {
  const { FormatTime, onHandleVideoByUserId, onHandleVideoUserId } =
    useContext(AppContext);
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
        className={` ${isDownload ? "flex sm:flex-row flex-col h-auto  p-4 " : "flex flex-col h-[27rem]  sm:h-[32rem] mb-6 p-4 "}  bg-gradient-to-tl from-slate-800 via-black to-slate-800 rounded-xl shadow-md  hover:shadow-lg transition  hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md space-x-4 sm:pb-0   `}
      >
        <video
          controls
          poster={s?.thumbnail}
          className={`  ${isDownload ? " md:h-56 md:w-96 sm:w-52 sm:h-36 w-full h-72 flex-shrink-0" : "w-full h-1/2 "}   rounded-xl  object-cover cursor-pointer hover:brightness-90 transition duration-200 `}
          onClick={() => handleVideoPage(s._id, s?.owner?._id)}
        >
          <source src={s?.videoFile} type="video/mp4" />
        </video>

        <div
          className={`flex flex-col sm:mx-4  justify-center  w-full ${isDownload ? "space-y-3" : "sm:space-y-6 space-y-2"}`}
        >
          <div className="flex items-center ">
            <button onClick={() => navigate(`/curr-user/${userId}/video`)}>
              <div className="h-11 w-11 rounded-full p-[2px]  mr-2 hover:scale-105 transition-transform duration-200">
                <img
                  className="h-full w-full rounded-full object-cover border-2 border-white"
                  src={s?.owner?.avatar}
                  alt="Channel Avatar"
                />
              </div>
            </button>
            <p
              className={`sm:text-sm font-medium text-gray-900  ${isDownload ? "text-white" : ""} text-white font-serif cursor-pointer hover:underline text-xs`}
            >
              {s?.owner?.channelName}
            </p>
          </div>
          <p
            className={`font-md  ${isDownload ? "md:text-base text-lg line-clamp-2 " : "md:text-lg  text-sm"}font-semibold  hover:text-cyan-700 transition-colors duration-200   text-white  font-serif cursor-pointer hover:underline `}
          >
            {s?.title}
          </p>

          <div
            className={`flex text-xs italic xs:text-xs font-normal space-x-4 text-white font-serif cursor-pointer hover:underline`}
          >
            <p>{s?.views} views</p>
            <p>{FormatTime(s?.createdAt)}</p>
          </div>

          <p
            className={` line-clamp-1 sm:text-sm text-xs text-white font-serif cursor-pointer hover:underline`}
          >
            {s?.description}
          </p>
          <div className="flex justify-between my-3">
            {likedAt ? (
              <small className="block text-[11px] text-white italic">
                Liked on {formatdate(likedAt)}
              </small>
            ) : (
              ""
            )}
            {isDownload ? (
              <div className="flex ">
                <button className="bg-red-900/60 text-sm text-white w-fit rounded-lg p-1 hover:opacity-100   ">
                  <Delete videoId={s._id} setDownloads={setDownloads}/>
                </button>
              </div>
            ) : (
              <button
                className="bg-cyan-800 sm:text-lg text-xs text-white  block  rounded-lg p-1 hover:opacity-80 w-fit px-3 mx-4 font-serif shadow-md shadow-blue-100 active:shadow-slate-900 "
                onClick={() => {
                  dislikedVideo(s?._id);
                }}
              >
                Dislike
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
