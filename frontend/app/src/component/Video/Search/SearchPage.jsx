import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { searchChannel } from "../../../Api/Subscription.js";
import {
  getSimilarChannelVideo,
  getSimilarVideo,
  RecommendedVideo,
} from "../../../Api/VideoApi.js";
import { AppContext } from "../../utils/contextApi.js";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import { sortVideo } from "./SearchPageComponent/SortVideo.jsx";
import useInfiniteScroll from "./SearchPageComponent/useInfiniteScroll.jsx";
import { fetchAndUpdateVideos } from "./SearchPageComponent/VideoHelper.js";
import VideoItem from "./SearchPageComponent/VideoItem.jsx";
import SearchSkeleton from "./SearchSkeleton.jsx";
const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    // allvideo,
    // setallvideo,
    selectedItem,

    setsimilarVideos,
  } = useContext(AppContext);
  const { id, query, type } = useParams();
  console.log(type, "title", type === "channel");
  const [allvideo, setallvideo] = useState([]);

  // const { tweet } = location.state;

  const [countValue, setCountValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNoVideo, setHasNoVideo] = useState(false);
  const [chanel, setchanel] = useState([]);
  const decodedQuery = query.replace("+", " ");

  useEffect(() => {
    setallvideo([]);
    console.log("decodedQuery", decodedQuery, query);
    if (type === "title") {
      similarvideo(id, 0);
      handleSearchChannel({ value: decodedQuery });
    } else if (type === "channel") {
      similarChannnelvideo(id, 0);
      handleSearchChannel({ value: decodedQuery });
      console.log("call api ");
    }
  }, [id, type, query]);
  const handleSearchChannel = async (userdata) => {
    try {
      const res = await searchChannel(userdata);
      const data = res.data.data;
      console.log("data of search channel", res.data.data);

      const channels = Array.isArray(data?.channel)
        ? data.channel
        : [data?.channel];
      const videos = Array.isArray(data?.video) ? data.video : [data?.video];
      const merged = [...channels, ...videos].filter(Boolean);

      setallvideo((prev) => {
        const unique = [...merged, ...prev];
        const uniqueMap = new Map(unique.map((item) => [item?._id, item]));
        return [...uniqueMap.values()];
      });
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  console.log(
    "all videocsm,c,s/'////////''''''''''''''''''''''''''''",
    allvideo,
  );
  const getallvideo = async (page) => {
    console.log("this api run ....................");
    fetchAndUpdateVideos({
      page: page,
      handleAxiosError: handleAxiosError,
      apiCall: RecommendedVideo,
      fetchNextVideo: fetchNextVideo,
      setallvideo: setallvideo,
      isDirectData: true,
      hasNoVideo: hasNoVideo,
      setHasNoVideo: setHasNoVideo,
      navigate: navigate,
    });
  };
  const fetchNextVideo = () => {
    if (loading) return;
    setLoading(true);
    setCountValue((prev) => {
      const newCount = prev + 1;
      getallvideo(newCount).finally(() => setLoading(false));
      return newCount;
    });
  };

  const similarvideo = async (videoId, page) => {
    fetchAndUpdateVideos({
      Id: videoId,
      page: page,
      handleAxiosError: handleAxiosError,
      apiCall: getSimilarVideo,
      fetchNextVideo: fetchNextVideo,
      setallvideo: setallvideo,
      setsimilarVideos: setsimilarVideos,
      navigate: navigate,
    });
  };

  const similarChannnelvideo = async (userId, page) => {
    fetchAndUpdateVideos({
      Id: userId,
      page: page,
      handleAxiosError: handleAxiosError,
      apiCall: getSimilarChannelVideo,
      fetchNextVideo: fetchNextVideo,
      setallvideo: setallvideo,
      setsimilarVideos: setsimilarVideos,
      navigate: navigate,
    });
  };
  const { count } = useInfiniteScroll({
    setLoading,
    similarChannnelvideo,
    similarvideo,

    hasNoVideo,
    setHasNoVideo,
    id,
    type,
  });
  return (
    <div className="w-[100%]  pt-24 pb-24">
      <div className="flex flex-col space-y-6 bg-gradient-to-bl from-slate-950 to-slate-900 sm:p-4 p-1 ">
        {sortVideo(allvideo, selectedItem?.label)?.map((s, index) => {
          const tweetPost = index === 4;
          return (
            <div key={index} className="w-full">
              {/* {tweetPost && tweet.length !== 0 && (
                <>
                  {" "}
                  <TweetSection tweet={tweet} />
                </>
              )} */}
              <VideoItem s={s} index={index} />
            </div>
          );
        })}

        {hasNoVideo && (
          <p className="text-2xl text-center text-white font-serif w-full bg-gradient-to-tr from-black via-blue-950 to-black">
            No more videos are available
          </p>
        )}
        {loading && (
          <div>
            {Array.from({ length: 3 }).map((_, i) => (
              <SearchSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;
