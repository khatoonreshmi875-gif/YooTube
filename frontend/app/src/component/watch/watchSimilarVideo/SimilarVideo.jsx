import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../utils/contextApi";
import { useCallback } from "react";
import { getSimilarVideo } from "../../../Api/VideoApi";
import { handleAxiosError, useAxiosErrorHandler } from "../../utils/erroeHandler";
import SimilarVideoSkeleton from "./SimilarVideoSkeleton";
import VideoMenu from "../../HomePage.jsx/HomePageComponent/VideoMenu";
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll";

const SimilarVideo = () => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  const { videoId } = useParams();
    const handleAxiosError = useAxiosErrorHandler();
  

  //usestate
  const [similarVideos, setSimilarVideos] = useState([]);
  const [count, setcount] = useState(0);
  const [loading, setloading] = useState(false);
  const [isPlaying, setisPlaying] = useState(null);

  //useref
  const hasFetchedFirst = useRef(false);
  const hasNomore = useRef(false);
  const videoref = useRef([]);
  // Reset when videoId changes

  useEffect(() => {
    if (videoId) {
      setcount(0);
      hasNomore.current = false;
      hasFetchedFirst.current = false;
      setSimilarVideos([]);
    }
  }, [videoId]);

  // API call

  const api = useCallback(async (videoId, newValue = 0) => {
    setloading(true);
    try {
      const res = await getSimilarVideo(videoId, newValue);
      if (res.data.data.video.length === 0) {
        setloading(false);
        hasNomore.current = true;
      }

      setSimilarVideos((prev) => {
        const combined = [...prev, ...res.data.data.video];
        const unique = Array.from(
          new Map(combined.map((v) => [v._id, v])).values(),
        );
        return unique;
      });
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setloading(false);
    }
  }, []);

  // First fetch

  useEffect(() => {
    if (videoId && hasFetchedFirst.current === false) {
      console.log("first time run");
      api(videoId, 0);
      hasFetchedFirst.current = true;
    }
  }, [videoId, api]);

  // Infinite scroll hook

  const {} = useInfiniteScroll({
    fn: (page) => api(videoId, page),
    hasFetchedFirst,
    hasNomore,
  });

  // Scroll to top when videoId changes

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  return (
    <div>
      {similarVideos?.map((s, index) => (
        <div
          key={s._id}
          className="flex sm:flex-row flex-col lg:flex-row justify-between 
             space-x-3 p-3 rounded-xl 
             bg-white border border-slate-200 
             shadow-sm hover:shadow-md 
             transition-all duration-300 ease-in-out 
             hover:scale-[1.02] cursor-pointer 
             mx-6 sm:mx-0 relative my-4"
        >
          {" "}
          {/* Video Preview */}
          <div className="flex sm:flex-row flex-col space-x-6">
            <video
              poster={s.thumbnail}
              className="sm:w-56 sm:h-32 w-full h-48 rounded-lg shadow-sm 
                 object-cover cursor-pointer 
                 hover:ring-2 hover:ring-blue-400 transition-all duration-200"
              ref={(el) => (videoref.current[index] = el)}
              onMouseOver={() => {
                setisPlaying(index);
                videoref.current[index]?.play();
              }}
              onMouseLeave={() => {
                setisPlaying(null);
                videoref.current[index]?.pause();
              }}
              onClick={() =>
                navigate(`/video-rec-page/${s?._id}/user/${s?.owner?._id}`)
              }
            >
              <source src={s.videoFile} type="video/mp4" />
            </video>

            {/* Video Info */}
            <div className="flex sm:static relative">
              <div className="flex flex-col justify-between space-y-1 w-full my-2">
                <p
                  className="font-semibold text-md sm:text-sm line-clamp-2 
                     text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {s.title}
                </p>
                <p className="lg:text-sm text-xs text-slate-600 font-medium">
                  {s.owner.channelName}
                </p>
                <div className="flex text-xs text-slate-600 space-x-2">
                  <p>{s.views} views</p>
                  <p>{FormatTime(s.createdAt)}</p>
                </div>
              </div>
              <div className="sm:hidden block">
                <VideoMenu index={index} v={s} />
              </div>
            </div>
          </div>
          {/* Video Menu (Desktop) */}
          <div className="hidden sm:block">
            <VideoMenu index={index} v={s} />
          </div>
        </div>
      ))}
      {hasNomore.current && (
        <p className="sm:text-xl text-sm text-center text-blue-600  w-full bg-blue-100 ">
          No more videos are available
        </p>
      )}
      {loading && (
        <div>
          {Array.from({ length: 8 }).map((_, i) => (
            <SimilarVideoSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(SimilarVideo);
