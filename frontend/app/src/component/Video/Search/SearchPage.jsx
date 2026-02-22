import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { searchChannel } from "../../../Api/Subscription.js";
import {
  getSimilarChannelVideo,
  getSimilarVideo,
  RecommendedVideo,
} from "../../../Api/VideoApi.js";
import { AppContext } from "../../utils/contextApi.js";
import { useAxiosErrorHandler } from "../../utils/erroeHandler.jsx";
import { sortVideo } from "./SearchPageComponent/SortVideo.jsx";
import useInfiniteScroll from "./SearchPageComponent/useInfiniteScroll.jsx";
import { fetchAndUpdateVideos } from "./SearchPageComponent/VideoHelper.js";
import VideoItem from "./SearchPageComponent/VideoItem.jsx";
const SearchPage = () => {
  const navigate = useNavigate();
    const handleAxiosError = useAxiosErrorHandler();
  
  const {

    setsimilarVideos,
  } = useContext(AppContext);
  const { id, query, type } = useParams();

  //usestate
const [allvideo, setallvideo] = useState([]);
  const [countValue, setCountValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasNoVideo, setHasNoVideo] = useState(false);
  const decodedQuery = query.replace("+", " ");


//useeffect for similar video api fetch and similar channel
  useEffect(() => {
    setallvideo([]);
    if (type === "title") {
      similarvideo(id, 0);
      handleSearchChannel({ value: decodedQuery });
    } else if (type === "channel") {
      similarChannnelvideo(id, 0);
      handleSearchChannel({ value: decodedQuery });
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
      handleAxiosError(err);
    }
  };
 
  const getallvideo = async (page) => {
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


  //api fetch for get similar video
  const similarvideo = async (videoId, page) => {
    fetchAndUpdateVideos({
      Id: videoId,
      page: page,
      handleAxiosError: handleAxiosError,
      apiCall: getSimilarVideo,
      fetchNextVideo: fetchNextVideo,
      setallvideo: setallvideo,
     
      navigate: navigate,
    });
  };

  //api fetch for get similar channel
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

  //infinite scroll
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
    <div className="w-[100%]  pb-24">
      <div className="flex flex-col space-y-6 sm:p-4 p-1 ">
        {sortVideo(allvideo, type)?.map((s, index) => {
          const tweetPost = index === 4;
          return (
            <div key={s._id} className="w-full">
              
              <VideoItem s={s} index={index} />
            </div>
          );
        })}

        {hasNoVideo && (
          <p className="text-2xl text-center text-white font-serif w-full bg-gradient-to-tr from-black via-blue-950 to-black">
            No more videos are available
          </p>
        )}
        
      </div>
    </div>
  );
};
export default SearchPage;
