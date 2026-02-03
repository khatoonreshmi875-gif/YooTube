import { useEffect, useState } from "react";
import { SortedTweet, TweetPageApi } from "../Api/TweetApi";
import { handleAxiosError } from "../component/utils/erroeHandler";
export const useTweet = () => {
  const [allTweet, setAllTweet] = useState([]);
  const [tweet, setTweet] = useState([]);

  const [loading, setloading] = useState(false);
  // const hasNoMore = useRef(false);
  // const getTweetOfSubscriber = async (page = 0) => {
  //   try {
  //     const url = await SortedTweet(page);
      // if (url.data.data.length !== 0) {
      //   setAllTweet((prev) => {
      //     const prevData = prev.map((p) => p._id);
      //     const newTweets = url.data.data.filter(
      //       (t) => !prevData.includes(t._id),
      //     ); // ✅ prevent duplicates
      //     return [...prev, ...newTweets];
      //   });
      // }else if{url.data.data.length===0}()else {
  //       setloading(false);
  //     }
  //   } catch (err) {
  //     handleAxiosError(err, navigate);
  //   }
  // };
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
    // allTweet,
    // setAllTweet,
    // tweet,
    setTweet,
    loading,
    // getTweetOfSubscriber,
  };
};
