import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleVideoDislike } from "../../Api/DislikeApi";
import { GetLikedVideos } from "../../Api/LikeApi";
import Layout from "../Layout";
import { handleAxiosError } from "../utils/erroeHandler";
import { sortVideos } from "./sortVideo";
import EmptyLIkeVideo from "./EmptyLIkeVideo";
import SortMenu from "./SortMenu";
import LoadingSpinner from "../utils/LoadingSpinner";
import { Bars3Icon } from "@heroicons/react/24/outline";

const LikeVideo = () => {
  const [sort, setSort] = useState("");
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
    return (
      <div className="mt-96">
        <LoadingSpinner label="Fetching like videos" />
      </div>
    );
  }
  return (
    <>
      {likeVideos?.[0]?.videos?.length === 0 ? (
        <EmptyLIkeVideo />
      ) : (
        <div className="min-h-screen   text-gray-900 ">
          {/* Header */}
          <div className="flex justify-between items-center p-5  shadow-md cursor-pointer">
            <span
              className="sm:text-lg text-sm font-semibold text-white"
              onClick={() => setIsopen(!Isopen)}
            >
              <Bars3Icon className="mx-h-6 w-6 text-white mx-2" />
            </span>
            <p className="bg-gradient-to-tr from-cyan-700 to-slate-800 px-4 py-2 rounded-lg font-poppins sm:text-xl text-sm font-medium text-white font-serif">
              Total liked videos :{likeVideos?.[0]?.count?.[0].totalLike}
            </p>
          </div>
          <SortMenu setSort={setSort} setIsopen={setIsopen} Isopen={Isopen} />

          <div className="sm:p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortVideos(likeVideos?.[0]?.videos, sort)?.map((s, index) => (
              <div
                key={index}
                className=" shadow-md rounded-lg sm:p-4 hover:shadow-lg transition pb-10"
              >
                <Layout
                  s={s.video}
                  index={index}
                  likedAt={s.createdAt}
                  dislikedVideo={dislikeVideo}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default LikeVideo;
