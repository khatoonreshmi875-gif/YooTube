import { useEffect, useState } from "react";
import { TweetPageApi } from "../Api/TweetApi";
export const useTweet = () => {
  const [allTweet, setAllTweet] = useState([]);
  const [tweet, setTweet] = useState([]);

  const [loading, setloading] = useState(false);

  const handleTweetPage = async (userId) => {
    try {
      const result = await TweetPageApi(userId);
      console.log("tweet page", result.data.data);
      setTweet(result?.data?.data);
    } catch (err) {
      console.log("get tweet for home page failed");
      console.log(err);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return {
    setTweet,
    loading,
  };
};
