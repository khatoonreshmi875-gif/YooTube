import React, { useCallback, useEffect, useState } from "react";

import {
  stateOfTweetDisike,
  toggleTweetDislike,
} from "../../../../Api/DislikeApi.js";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { stateOfTweetLike, toggleTweetLike } from "../../../../Api/LikeApi.js";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";
import LikeDislike from "../LikeDislike.jsx";

const TweetLike = ({ tweetId, initialLikeCount, initialDislikeCount }) => {
  const navigate = useNavigate();
  // usestate
  console.log("tweet data of like", initialDislikeCount, initialLikeCount);
  const [reaction, setReaction] = useState({
    likeCount: initialLikeCount,
    dislikeCount: initialDislikeCount,
    liked: false,
    disliked: false,
  });

  // effect

  useEffect(() => {
    setReaction((prev) => ({
      ...prev,
      likeCount: initialLikeCount ?? 0,
      dislikeCount: initialDislikeCount ?? 0,
    }));
  }, [initialLikeCount, initialDislikeCount]);

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
        handleAxiosError(err);
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
        handleAxiosError(err);
      }
    },
    [tweetId],
  );

  return (
    <>
      <LikeDislike
        onClick1={() => {
          tweetLike(tweetId);
        }}
        onClick={() => {
          toggleDislike(tweetId);
        }}
        reaction={reaction}
      />
    </>
  );
};

export default React.memo(TweetLike);
