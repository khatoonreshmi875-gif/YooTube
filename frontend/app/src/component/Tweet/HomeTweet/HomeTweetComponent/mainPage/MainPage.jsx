import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../../utils/contextApi.js";
import ShareButon from "../../../../ShareButon.jsx";
import TweetLike from "../../../UserTweet/TweetPageComponent/TweetLike.jsx";
import TweetContent from "./mainPageComponent/TweetContent.jsx";
import TweetMedia from "./mainPageComponent/TweetMedia.jsx";
import TweetHeader from "./mainPageComponent/TweetHeader.jsx";
const MainPage = ({ tweet, isNested, tweetByTweetId }) => {
  const handleAvatar = async (userId) => {
    navigate(`/curr-user/${userId}/video`);
  };
  console.log(
    "tweetdata",
    tweet,
    tweet?.tweetLikeCount,
    tweet?.tweetDislikeCount,
  );
  return (
    <>
      <div className={`${isNested ? "" : "h-screen"}`}>
        {/* Tweet Card */}
        <div
          className={`${isNested ? " w-full lg:h-[45rem] sm:h-[38rem] h-[35rem] " : "h-[95%] mt-24"} bg-gradient-to-br from-cyan-900 via-black to-cyan-900 shadow-md rounded-xl overflow-hidden shadow-blue-300 hover:from-black hover:via-cyan-900 hover:to-black hover:shadow-lg hover:shadow-blue-200 mt-2`}
        >
          {/* Header */}
          <TweetHeader tweet={tweet} />

          {/* Content */}
          <TweetContent tweet={tweet} />

          {/* Media */}
          <TweetMedia tweet={tweet} />
          <div className="flex items-center justify-between xl:w-full pr-6 h-[10%] my-2 ">
            <div className="sm:p-4  w-2/3 sm:w-24 ">
              <TweetLike
                tweetId={tweet?._id}
                initialLikeCount={tweet?.tweetLikeCount}
                initialDislikeCount={tweet?.tweetDislikeCount}
              />
            </div>
            <ShareButon tweet={tweet} isMain={true} />
          </div>
          {/* Like/Dislike */}
        </div>

        {/* Comments */}
      </div>
    </>
  );
};

export default MainPage;
