import { Bars3Icon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../../utils/contextApi.js";
import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";
import VideoMenu from "../VideoMenu.jsx";
import EmptyVideoPage from "./EmptyVideoPage.jsx";
import { sortVideos } from "../../../Like/sortVideo";
import SortMenu from "../../../Like/SortMenu.jsx";
import HoverVideo from "../../../HomePage.jsx/HomePageComponent/HoverVideo.jsx";
import VideoInfo from "../../../HomePage.jsx/HomePageComponent/VideoInfo.jsx";

const VideoPage = () => {
  const [sort, setSort] = useState("");
  const { userId } = useParams();
  const { video, user } = useContext(AppContext);
  const [IsOpen, setIsOpen] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef([]);
  const [isImageIndex, setIsImageIndex] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const goToVideoPage = async (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`);
  };
  if (video === null) {
    return <LoadingSpinner label="Fetching Videos" />;
  }
  if (video.length === 0) {
    // data fetched but no videos
    return <EmptyVideoPage userId={userId} />;
  }

  return (
    <>
      <span
        className="sm:text-lg text-sm font-semibold text-white"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <Bars3Icon className="mx-h-6 w-6 text-white mx-2" />
      </span>
      <SortMenu
        setSort={setSort}
        setIsopen={setIsOpenMenu}
        Isopen={isOpenMenu}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2  lg:gap-5  ">
        {sortVideos(video, sort).map((v, index) => (
          <div
            key={index}
            className="bg-gradient-to-tl from-slate-800 via-black to-slate-800 rounded-xl shadow-md  hover:shadow-lg transition pb-1 hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md "
          >
            {" "}
            <HoverVideo
              video={v}
              videoref={videoRef}
              onClick={() => goToVideoPage(v._id, v.owner._id)}
              isImageIndex={isImageIndex}
              setisImageIndex={setIsImageIndex}
            />
            {/* Video Info */}
            <div className="flex justify-between items-start px-2 mt-2 lg:pb-4 relative ">
              <VideoInfo showImage={false} v={v} />
              {(user._id === userId ||
                user.role === "admin" ||
                user.role === "moderator") && (
                <div className="">
                  <button
                    onClick={() => setIsOpen(IsOpen === index ? null : index)}
                    className="text-2xl ml-auto text-white hover:text-gray-300 transition "
                  >
                    {IsOpen === index ? (
                      <XMarkIcon className="h-6 w-10 text-white" />
                    ) : (
                      <EllipsisVerticalIcon className="h-6 w-10 text-white " />
                    )}
                  </button>
                  <VideoMenu v={v} isOpen={IsOpen} index={index} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default VideoPage;
