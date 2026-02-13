import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../utils/contextApi";
import { useCallback } from "react";
import { getSimilarVideo } from "../../../Api/VideoApi";
import { handleAxiosError } from "../../utils/erroeHandler";
import SimilarVideoSkeleton from "./SimilarVideoSkeleton";
import VideoMenu from "../../HomePage.jsx/HomePageComponent/VideoMenu";

const SimilarVideo = () => {
  const { FormatTime } = useContext(AppContext);
  const videoref = useRef([]);
  const [isPlaying, setisPlaying] = useState(null);
  const navigate = useNavigate();

  const hasNomore = useRef(false);
  //const { videoId } = useSelector((state) => state.video);
  const [count, setcount] = useState(0);
  const [loading, setloading] = useState(false);
  const hasFetchedFirst = useRef(false);
  const { videoId } = useParams();

  const [similarVideos, setSimilarVideos] = useState([]); // r
  useEffect(() => {
    if (videoId) {
      setcount(0);
      hasNomore.current = false;
      hasFetchedFirst.current = false;
      setSimilarVideos([]);
    }
  }, [videoId]);

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
      handleAxiosError(err, navigate);
    } finally {
      setloading(false);
    }
  }, []);
  //hasNomore.current === false

  useEffect(() => {
    if (videoId && hasFetchedFirst.current === false) {
      console.log("first time run");
      api(videoId, 0);
      hasFetchedFirst.current = true;
    }
  }, [videoId, api]);

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      hasNomore.current === false &&
      hasFetchedFirst.current === true
    ) {
      setcount((prev) => {
        const newValue = prev + 1;
        api(videoId, newValue);
        return newValue;
      });
    }
  }, [api, videoId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  return (
    <div>
      {similarVideos?.map((s, index) => (
        <div
          key={index}
          className="flex sm:flex-row flex-col lg:flex-row justify-between space-x-3 p-2 rounded-lg bg-gradient-to-tl from-slate-800 via-black to-slate-800 shadow-md  hover:shadow-lg transition pb-1 hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md  my-4  hover:cursor-pointer mx-8  sm:mx-0 relative"
        >
          <div className="flex sm:flex-row flex-col space-x-6">
            <video
              poster={s.thumbnail}
              className="sm:w-56 sm:h-32 w-full h-48   rounded-xl shadow-md object-cover cursor-pointer"
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
                <p className="md:font-semibold text-md sm:text-sm  line-clamp-2  font-serif text-white hover:text-black">
                  {s.title}
                </p>
                <p className="text-xs text-gray-200">{s.owner.channelName}</p>
                <div className="flex text-xs text-gray-200 space-x-2">
                  <p>{s.views} views</p>
                  <p>{FormatTime(s.createdAt)}</p>
                </div>
              </div>
              <div className="sm:hidden block">
                <VideoMenu index={index} v={s} />
              </div>
            </div>
          </div>
          {/* Video Thumbnail */}

          <div className="hidden sm:block">
            <VideoMenu index={index} v={s} />
          </div>
        </div>
      ))}
      {hasNomore.current && (
        <p className="text-2xl text-center  font-serif w-full bg-slate-700">
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
