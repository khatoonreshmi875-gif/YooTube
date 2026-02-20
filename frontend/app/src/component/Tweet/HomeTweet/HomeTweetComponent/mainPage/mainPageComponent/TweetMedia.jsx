import React from "react";
import { useTweetMedia } from "./useMedia";
import { TweetByTweetId } from "../../../../../../Api/TweetApi";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi"; 
const TweetMedia = ({ tweet, isTweet = false }) => {
  const {
    showVisibleIndex,
    setShowVisibleIndex,
    videoRef,
    ref,
    getFileType,
    merge,
  } = useTweetMedia(tweet);
  const navigate = useNavigate();
  return (
    <div
      className={` ${isTweet ? "relative w-full aspect-square" : "relative w-full aspect-square bg-gray-100"}`}
    >
      {merge(tweet).map((p, Imageindex) => (
        <div key={p._id} ref={(el) => (ref.current[Imageindex] = el)}>
          <div
            onClick={() => {
              TweetByTweetId(tweet._id);
              navigate(`/main-tweet/${tweet._id}`);
            }}
            className={`absolute inset-0 transition-opacity duration-500 ${
              showVisibleIndex[tweet?._id] === Imageindex
                ? "z-40 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            {}
            {getFileType(p) === "mp4" ? (
              <video
                className="w-full aspect-video object-cover "
                autoPlay
                playsInline
                ref={videoRef}
               
                onMouseLeave={() => {
                  videoRef.current.pause();
                  let initial = {};
                  initial[tweet?._id] = 0;
                  setShowVisibleIndex(initial);
                }}
                onClick={() => {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                  } else {
                    videoRef.current.pause();
                  }
                }}
              >
                <source src={p} type="video/mp4" />
              </video>
            ) : (
              <img
                src={p}
                className="w-full aspect-square   object-fit "
                alt="tweet media"
              
                onClick={() => {
                  TweetByTweetId(tweet._id);
                  navigate(`/main-tweet/${tweet._id}`);
                }}
              />
            )}
          </div>

          {/* Next button */}
          <button
            onClick={() =>
              setShowVisibleIndex((prev) => ({
                ...prev,
                [tweet._id]: (prev[tweet._id] + 1) % merge(tweet).length || 0,
              }))
            }
            className="absolute bottom-2 right-2 bg-white/40 sm:p-0.5 rounded shadow hover:bg-gray-200 z-40 text-xs"
          >
           <BiRightArrowAlt/>
          </button>

          {/* Counter */}
          <p
            className={`absolute top-0 right-0 bg-white/40 px-2 shadow text-[12px]  z-40 text-black font-light text-xs`}
          >
            {(showVisibleIndex[tweet?._id] ?? 0) + 1} / {merge(tweet).length}
          </p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(TweetMedia);
