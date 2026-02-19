import { Bars3Icon } from "@heroicons/react/24/outline";
import { HeartIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleVideoDislike } from "../../Api/DislikeApi";
import { GetLikedVideos } from "../../Api/LikeApi";
import Layout from "../Layout";
import EmptySkeleton from "../utils/EmptySkeleton";
import LoadingSpinner from "../utils/LoadingSpinner";
import { AppContext } from "../utils/contextApi";
import SortMenu from "./SortMenu";
import { sortVideos } from "./sortVideo";
import { Home } from "../Home";
const LikeVideo = () => {
  const { user } = useContext(AppContext);
  const [sort, setSort] = useState("");
  const formatdate = (date) => new Date(date).toLocaleString();
  const navigate = useNavigate();
  const [likeVideos, setlikeVideos] = useState(null);
  const [Isopen, setIsopen] = useState(false);
  const dislikeVideo = async (videoId) => {
    setlikeVideos((prev) => {
      return [
        {
          ...prev[0],
          videos: prev[0].videos.filter((p) => p.video._id !== videoId),
          count: [
            {
              ...prev[0].count[0],
              totalLike: prev[0].count[0].totalLike - 1,
            },
          ],
        },
      ];
    });

    const res = await toggleVideoDislike(videoId);
    console.log("response of video dislike", res);
  };

  const allLikedVideo = async () => {
    const res = await GetLikedVideos();
    setlikeVideos(res.data.data);
  };
  useEffect(() => {
    allLikedVideo();
  }, []);
  if (!likeVideos) {
    return <LoadingSpinner label="Fetching like videos" />;
  }
  if (likeVideos?.[0]?.videos?.length === 0) {
    // data fetched but no videos
    return (
      <div className="bg-white flex  w-full h-full justify-center items-center">
        <EmptySkeleton
          Icon={HeartIcon}
          button_msg=" Explore Channels"
          msg=" You haven’t liked any videos yet. Start exploring and save your
                 favorites."
          heading_text="    No liked videos yet"
          onClick={() => navigate("/")}
          userId={user._id}
        />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen   text-gray-900 ">
        {/* Header */}
        <div className="flex justify-between items-center p-5  shadow-md cursor-pointer">
          <span
            className="sm:text-lg text-sm font-semibold text-slate-800"
            onClick={() => setIsopen(!Isopen)}
          >
            <Bars3Icon className="mx-h-6 w-6 text-slate-800 mx-2" />
          </span>
          <p className="bg-blue-100 px-4 py-2 rounded-lg  sm:text-lg text-sm  text-blue-600">
            Total liked videos : {likeVideos?.[0]?.count?.[0].totalLike}
          </p>
        </div>
        <SortMenu setSort={setSort} setIsopen={setIsopen} Isopen={Isopen} />

        <div className="sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortVideos(likeVideos?.[0]?.videos, sort)?.map((s, index) => (
            <div key={index}>
              <Home
                v={s.video}
                index={index}
                likedAt={s.createdAt}
                dislikedVideo={dislikeVideo}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LikeVideo;
