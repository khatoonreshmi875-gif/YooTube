import { Bars3Icon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AppContext } from "../../../utils/contextApi.js";
import LoadingSpinner from "../../../utils/LoadingSpinner.jsx";
import VideoMenu from "../VideoMenu.jsx";
import { sortVideos } from "../../../Like/sortVideo";
import SortMenu from "../../../Like/SortMenu.jsx";
import HoverVideo from "../../../HomePage.jsx/HomePageComponent/HoverVideo.jsx";
import VideoInfo from "../../../HomePage.jsx/HomePageComponent/VideoInfo.jsx";
import EmptySkeleton from "../../../utils/EmptySkeleton.jsx";
import { MdVideoLibrary } from "react-icons/md";

const VideoPage = () => {
  const [sort, setSort] = useState("");
  const { userId } = useParams();
  const { video, user } = useContext(AppContext);
  const navigate = useNavigate();
  const videoRef = useRef([]);
  const [isImageIndex, setIsImageIndex] = useState(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [disabledUI, setDisabledUI] = useState(false);

  const goToVideoPage = async (videoId, userId) => {
    navigate(`/video-rec-page/${videoId}/user/${userId}`);
  };
  if (video === null) {
    return <LoadingSpinner label="Fetching Videos" />;
  }
  if (video.length === 0) {
    // data fetched but no videos
    return (
      <div className="bg-white w-fit h-fit mx-auto border-slate-300 shadow-md rounded-lg p-3">
        <EmptySkeleton
          Icon={MdVideoLibrary}
          button_msg=" Upload Video"
          msg="You haven’t uploaded any videos yet. Start by creating your first video!"
          heading_text="  No videos available"
          onClick={() => navigate("/upload-video")}
          userId={userId}
        />
      </div>
    );
  }
  return (
    <>
      <span
        className="sm:text-lg text-sm font-semibold text-white"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <Bars3Icon className="mx-h-6 w-6 text-slate-700 mx-2" />
      </span>
      <SortMenu
        setSort={setSort}
        setIsopen={setIsOpenMenu}
        Isopen={isOpenMenu}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2  lg:gap-5  ">
        {sortVideos(video, sort).map((v, index) => (
          <div
            key={v._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 
                        hover:shadow-md transition w-full h-full"
          >
            <HoverVideo
              video={v}
              videoref={videoRef}
              onClick={() => goToVideoPage(v._id, v.owner._id)}
              isImageIndex={isImageIndex}
              setisImageIndex={setIsImageIndex}
            />
            {/* Video Info */}
            <div className="flex justify-between items-start px-2 mt-2 lg:pb-4 w-full  relative">
              <VideoInfo showImage={false} v={v} />
              {(user._id === userId ||
                user.role === "admin" ||
                user.role === "moderator") && (
                <div className="">
                  <VideoMenu
                    v={v}
                    index={index}
                    setDisabledUI={setDisabledUI}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {disabledUI && (
        <div className="fixed inset-0 bg-white/30 bg-opacity-30 z-50 cursor-not-allowed "></div>
      )}
    </>
  );
};
export default VideoPage;
