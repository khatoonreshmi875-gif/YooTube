import React from "react";
import { useNavigate } from "react-router-dom";
import { TweetByTweetId } from "../../../../Api/TweetApi";
import MainPage from "../../../Tweet/HomeTweet/HomeTweetComponent/mainPage/MainPage";
import { useLocation } from "react-router-dom";
import { handleAxiosError } from "../../../utils/erroeHandler";
const TweetSection = ({ tweet, tweetPost }) => {
  const navigate = useNavigate();
  const tweetByTweetId = async (tweetId) => {
    try {
      const res = await TweetByTweetId(tweetId);
      navigate(`/main-tweet/${tweetId}`, {
        state: { tweet: res.data.data },
      });
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div className="">
      <div className="flex  overflow-x-auto w-[90vw] space-x-4  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {(tweet || [])?.map((tweet, idx) => (
          <div
            key={tweet._id}
            className="flex-shrink-0 w-full sm:w-80 md:w-96 h-auto  bg-white rounded-lg shadow-md"
          >
            <MainPage
              tweet={tweet}
              isNested={true}
              tweetByTweetId={tweetByTweetId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetSection;
