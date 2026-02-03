import React from "react";

const HoverVideo = ({
  video,
  onClick,
  setisImageIndex,

  isImageIndex,
  videoref,
  isData,
}) => {
 

  return isImageIndex === video?._id ? (
    <div className="px-4 py-4 h-[70%]">
      <video
        controls
        autoPlay
        muted
        playsInline
        onClick={onClick}
        className="w-full h-full rounded-lg object-cover"
        onMouseLeave={() => setisImageIndex(null)}
        ref={(el) => (videoref.current[video?._id] = el)}
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
    <div className="px-4 py-4 h-[70%] relative  ">
      <img
        src={video?.thumbnail}
        alt={video?.title}
        className="w-full h-full rounded-lg object-cover cursor-pointer  shadow-[4px_4px_6px_black,-4px_-4px_6px_black,0_0_8px_blue] "
        onMouseEnter={() => setisImageIndex(video?._id)}
        onClick={onClick}
      />
      {isData && (
        <div className="w-[95%] ">
          <div className="absolute bottom-3 w-[93%] bg-gradient-to-r from-gray-100 via-blue-200 to-slate-200 shadow-[4px_4px_6px_black,-4px_-4px_6px_gray,0_0_8px_blue]  flex font-serif  text-sm font-semibold p-4 rounded-b-lg">
            Total videos:{video?.videos?.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default HoverVideo;
