import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../utils/contextApi.js";

const VideoInfo = ({ v, isData = false, watchedAt, showImage = true }) => {
  const { FormatTime } = useContext(AppContext);
  const navigate = useNavigate();
  console.log("view", v.views, v);
  return (
    <>
      {" "}
      <div className=" relative flex items-start w-full  pb-4 h-[30%] px-1">
        {showImage && (
          <img
            src={v?.owner?.avatar}
            alt={v?.owner?.channelName}
            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-cyan-950 hover:border-transparent transition  shadow-md border-2 border-white/80 hover:scale-110 duration-200 "
            onClick={() => {
              navigate(`/curr-user/${v?.owner?._id}/video`);
            }}
          />
        )}

        <div className="flex-1 ml-3 space-y-1">
          <p className="font-normal lg:text-lg text-white line-clamp-2 text-sm font-serif">
            {v?.title || v?.name}
          </p>
          <p className="lg:text-sm text-xs  text-white font-extralight ">
            {v?.owner?.channelName}
          </p>
          <div>
            {showImage === false && (
              <p className="text-gray-300 lg:text-sm line-clamp-1 text-[0.8rem]">
                {v.description}
              </p>
            )}
          </div>
          <div className="flex space-x-4 flex-col lg:text-sm text-xs xs:flex-row italic text-gray-300 mt-1 font-thin">
            <span>{v?.views||v?.totalViews} views</span>
            <span>
              {v?.createdAt ? (
                FormatTime(v?.createdAt)
              ) : (
                <p className="italic xl:text-sm text-xs text-gray-200">
                  watched at {FormatTime(watchedAt)}
                </p>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(VideoInfo);
