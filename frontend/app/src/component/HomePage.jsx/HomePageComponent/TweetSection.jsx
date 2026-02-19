import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SortedTweet, TweetByTweetId } from "../../../Api/TweetApi";
import MainPage from "../../Tweet/HomeTweet/HomeTweetComponent/mainPage/MainPage";
import TweetSkeleton from "../../Tweet/TweetSkeleton";
import { handleAxiosError } from "../../utils/erroeHandler";

const TweetSection = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allTweet, setAllTweet] = useState([]);
  const hasNoMore = useRef(false);
  const containerRef = useRef(null);
  const getTweetOfSubscribers = async (page = 0) => {
    setLoading(true);
    try {
      const url = await SortedTweet(page);
      console.log("url of tweet ✅ ", url);
      if (url.data.data.length !== 0) {
        setAllTweet((prev) => {
          const prevData = prev.map((p) => p._id);
          const newTweets = url.data.data.filter(
            (t) => !prevData.includes(t._id),
          ); // ✅ prevent duplicates
          return [...prev, ...newTweets];
        });
        console.log("data of oloading", loading);
      }
      if (url.data.message === "No more tweets available") {
        console.log("show data 👉", url);
        hasNoMore.current = true;
      }
    } catch (err) {
      handleAxiosError(err, navigate);
    } finally {
      setLoading(false);
    }
  };
console.log("all tweet data",)
  useEffect(() => {
    setCount(0);
    getTweetOfSubscribers(0);
    hasNoMore.current = false;
  }, []);
  useEffect(() => {
    console.log("Loading state changed: a 👉", loading);
  }, [loading]);

  //Infinite Scroll Handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;
      const reachedEnd = scrollLeft + clientWidth >= scrollWidth - 2;
      if (reachedEnd && hasNoMore.current === false) {
        setCount((prev) => {
          const newValue = prev + 1;
          getTweetOfSubscribers(newValue);
          return newValue;
        });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const tweetByTweetId = async (tweetId) => {
    try {
      const res = await TweetByTweetId(tweetId);
      navigate(`/main-tweet/${tweetId}`, {
        state: { tweet: res.data.data },
      });
    } catch (error) {
      console.log("get Tweet by tweet id fetch failed ");
      handleAxiosError(error, navigate);
    }
  };

  return (
    <div className="w-full ">
      <div
        className="flex flex-row overflow-x-auto  space-x-4"
        ref={containerRef}
      >
        {allTweet.map((tweet, index) => (
          <div
            key={`${index}+${tweet._id}`}
            className="lg:w-[350px] sm:w-[300px] w-[250px] flex-shrink-0  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  rounded-lg shadow-md "
          >
            <MainPage
              tweet={tweet}
              isNested={true}
              tweetByTweetId={tweetByTweetId}
            />
          </div>
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, i) => <TweetSkeleton key={i} />)}
        {hasNoMore.current && (
          <p className="sm:text-xl text-sm text-center text-blue-600 w-full bg-blue-100 ">
            No  tweets are available
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(TweetSection);
