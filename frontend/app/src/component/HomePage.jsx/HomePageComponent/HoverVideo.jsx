import React from "react";

const HoverVideo = ({
  video,
  onClick,
  setisImageIndex,

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
    <div className="px-4 py-4 w-full aspect-video ">
      <video
        controls
        autoPlay
        muted
        playsInline
        onClick={onClick}
        className="w-full aspect-video rounded-lg object-cover"
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
    <div className="px-4 py-4 relative w-full aspect-video  ">
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="w-full aspect-video rounded-lg object-cover cursor-pointer  shadow-[4px_4px_6px_black,-4px_-4px_6px_black,0_0_8px_blue] "
        onMouseEnter={() => setisImageIndex(video?._id)}
        onClick={onClick}
      />
      {isData ? (
      
          <div className="absolute bottom-3 w-fit h-fit bg-white/30      flex font-serif  text-sm font-semibold  rounded-sm px-2">
            Total videos:{video?.videos?.length}
          </div>
      
      ) : (
        <p className="absolute bottom-4 right-6 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {formatTime(video?.duration)}
        </p>
      )}
    </div>
  );
};

export default React.memo(HoverVideo);
