import React from "react";

const HoverVideo = ({
  video,
  onClick,
  setisImageIndex,
  isDownload,
  isImageIndex,
  videoref,
  isData,
}) => {
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return isImageIndex === video?._id ? (
    <div
      className={`${
        isDownload ? "sm:w-96 w-full" : "w-full"
      }px-4 py-4 w-full aspect-video`}
    >
      <video
        controls
        autoPlay
        muted
        playsInline
        onClick={onClick}
        className="w-full aspect-video rounded-lg object-cover border border-gray-200 shadow-sm hover:shadow-md transition"
        onMouseLeave={() => setisImageIndex(null)}
        ref={(el) => (videoref.current[video?._id] = el)}
        preload="none"
      >
        <source
          src={
            video?.videos?.length > 0
              ? video.videos[0].videoFile
              : video?.videoFile
          }
          type="video/mp4"
        />
      </video>
    </div>
  ) : (
    <div
      className={`${
        isDownload ? "sm:w-96 w-full" : "w-full"
      }px-4 py-4 w-full aspect-video relative`}
    >
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="w-full aspect-video rounded-lg object-cover cursor-pointer 
                 border border-gray-200 shadow-sm hover:shadow-md transition"
        onMouseEnter={() => setisImageIndex(video?._id)}
        onClick={onClick}
      />

      {isData ? (
        <div className="absolute bottom-4 left-0 bg-white/80 text-gray-700 text-xs
                      sm:text-sm font-medium rounded px-2 py-1 shadow-sm">
          Total videos: {video?.videos?.length}
        </div>
      ) : (
        <p className="absolute bottom-4 right-0 bg-gray-800/80 text-white 
                   text-xs px-2 py-1 rounded shadow-sm">
          {formatTime(video?.duration)}
        </p>
      )}
    </div>
  )
}
  export default HoverVideo;