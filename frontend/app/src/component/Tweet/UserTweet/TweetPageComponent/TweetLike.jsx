import React, { useCallback, useEffect, useState } from "react";

import {
  stateOfTweetDisike,
  toggleTweetDislike,
} from "../../../../Api/DislikeApi.js";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { stateOfTweetLike, toggleTweetLike } from "../../../../Api/LikeApi.js";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";

const TweetLike = ({ tweetId, initialLikeCount, initialDislikeCount }) => {
  const navigate = useNavigate();
  // usestate

  const [reaction, setReaction] = useState({
    likeCount: initialLikeCount,
    dislikeCount: initialDislikeCount,
    liked: false,
    disliked: false,
  });

  // effect

  useEffect(() => {
    const fetchInitialState = async () => {
      if (!tweetId) return;
      console.log(tweetId);
      try {
        const likeRes = await stateOfTweetLike(tweetId);
        console.log(`like res of tweet of ${tweetId}`, likeRes);
        const dislikeRes = await stateOfTweetDisike(tweetId);
  console.log(`like res of tweet of ${tweetId}`, dislikeRes);
        setReaction((prev) => ({
          ...prev,
          liked: likeRes.data?.data?.isTweetLike ?? false,
          disliked: dislikeRes.data.data.isTweetdisLike ?? false,
        }));
      } catch (err) {
        console.error("Error fetching initial reaction state:", err);
      }
    };

    fetchInitialState();
  }, [tweetId]);

  //handlers

  const toggleDislike = useCallback(
    async (tweetId) => {
      try {
        setReaction((prev) => ({
          dislikeCount: prev.disliked
            ? Math.max(0, prev.dislikeCount - 1)
            : prev.dislikeCount + 1,
          disliked: !prev.disliked,
          likeCount: prev.liked
            ? Math.max(0, prev.likeCount - 1)
            : prev.likeCount,
          liked: prev.liked ? false : prev.liked,
        }));
        const result = await toggleTweetDislike(tweetId);
        console.log("data are ", result);

        setReaction((prev) => ({
          ...prev,
          dislikeCount: result?.data?.data?.updatedTweet?.tweetDislikeCount,
          likeCount: result?.data?.data?.updatedTweet?.tweetLikeCount,
          liked: result?.data?.data?.likeRemoved,
          disliked: result?.data?.data?.dislike,
        }));
      } catch (err) {
        handleAxiosError(err, naviagte);
      }
    },
    [tweetId],
  );

  const tweetLike = useCallback(
    async (tweetId) => {
      try {
        setReaction((prev) => {
          return {
            likeCount: prev.liked
              ? Math.max(0, prev.likeCount - 1)
              : prev.likeCount + 1,
            liked: !prev.liked,
            dislikeCount: prev.disliked
              ? Math.max(0, prev.dislikeCount - 1)
              : prev.dislikeCount,
            disliked: prev.disliked ? false : prev.disliked,
          };
        });

        const result = await toggleTweetLike(tweetId);
        setReaction((prev) => ({
          ...prev,
          dislikeCount: result?.data?.data?.updatedTweet.tweetDislikeCount,
          likeCount: result.data?.data?.updatedTweet?.tweetLikeCount,
          liked: result.data.data.Liked,
          disliked: result.data.data.RemoveDislike,
        }));
      } catch (err) {
        handleAxiosError(err, navigate);
      }
    },
    [tweetId],
  );

  return (
    <div className="flex flex-row items-center ">
      <button
        onClick={() => {
          tweetLike(tweetId);
        }}
        className="md:m-5 text-sm  text-white  flex space-x-2 "
      >
        {reaction.liked ? (
          <ThumbsUp fill="white" stroke="white" size={16} />
        ) : (
          <ThumbsUp size={16} />
        )}

        <span className="text-gray-200 text-xs md:text-sm">
          {reaction.likeCount}
        </span>
      </button>
      <button
        className="text-sm text-white flex  space-x-2 "
        onClick={() => {
          toggleDislike(tweetId);
        }}
      >
        {reaction.disliked ? (
          <ThumbsDown fill="white" stroke="white" size={16} />
        ) : (
          <ThumbsDown size={16} />
        )}

        <span className="text-gray-200 text-xs md:text-sm">
          {reaction.dislikeCount}
        </span>
      </button>
    </div>
  );
};

export default React.memo(TweetLike);
