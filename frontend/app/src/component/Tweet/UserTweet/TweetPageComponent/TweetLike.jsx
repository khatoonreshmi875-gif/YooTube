import React, { useCallback, useEffect, useState } from "react";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import {
  stateOfTweetDisike,
  toggleTweetDislike,
} from "../../../../Api/DislikeApi.js";
import { stateOfTweetLike, toggleTweetLike } from "../../../../Api/LikeApi.js";

const TweetLike = ({ tweetId, initialLikeCount, initialDislikeCount }) => {
  const [initialLike, setinitialLike] = useState([]);
  const [initialDislike, setinitialDislike] = useState([]);
  const [reaction, setreaction] = useState({
    likeCount: initialLikeCount,
    dislikeCount: initialDislikeCount,
    liked: false,
    disliked: false,
  });
  console.log(
    "reaction",
    reaction,
    tweetId,
    initialLikeCount,
    initialDislikeCount,
    reaction.likeCount,
  );
  useEffect(() => {
    setreaction((prev) => ({
      ...prev,
      likeCount: initialLikeCount ?? 0,
      dislikeCount: initialDislikeCount ?? 0,
    }));
  }, [initialLikeCount, initialDislikeCount]);

  const stateTweetDislike = useCallback(async (tweetId) => {
    if (!tweetId) return;
    const result = await stateOfTweetDisike(tweetId);

    setinitialDislike(result.data.data.isTweetdisLike);
    console.log("initial dislike", initialDislike);
  }, []);
  const stateTweetLike = useCallback(async (tweetId) => {
    const result = await stateOfTweetLike(tweetId);
    setinitialLike(result.data.data.isTweetLike);
    console.log("initial like", initialLike);
  }, []);
  useEffect(() => {
    if (tweetId) {
      console.log("tweetid", tweetId);
      stateTweetLike(tweetId);
      stateTweetDislike(tweetId);
    }
  }, [tweetId]);

  useEffect(() => {
    setreaction((prev) => {
      return {
        ...prev,
        liked: initialLike,
        disliked: initialDislike,
      };
    });
  }, [initialLike, initialDislike]);

  const toggleDislike = useCallback(
    async (tweetId) => {
      setreaction((prev) => ({
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

      setreaction((prev) => ({
        ...prev,
        dislikeCount: result?.data?.data?.updatedTweet?.tweetDislikeCount,
        likeCount: result?.data?.data?.updatedTweet?.tweetLikeCount,
        liked: result?.data?.data?.likeRemoved,
        disliked: result?.data?.data?.dislike,
      }));
    },
    [tweetId],
  );

  const tweetLike = useCallback(
    async (tweetId) => {
      setreaction((prev) => {
        //console.log("liked", prev.liked);
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
      setreaction((prev) => ({
        ...prev,
        dislikeCount: result?.data?.data?.updatedTweet.tweetDislikeCount,
        likeCount: result.data?.data?.updatedTweet?.tweetLikeCount,
        liked: result.data.data.Liked,
        disliked: result.data.data.RemoveDislike,
      }));
      console.log("liked", result.data.data.updatedTweet.tweetDislikeCount);
    },
    [tweetId],
  );

  return (
    <div className="flex justify-between sm:justify-between">
      <button
        onClick={() => {
          tweetLike(tweetId);
        }}
        className="md:m-5 text-sm  "
      >
        {reaction.liked ? (
          <BiSolidLike className="text-gray-200" />
        ) : (
          <BiLike className="text-gray-200" />
        )}

        <span className="text-gray-200 text-xs md:text-sm">
          {reaction.likeCount} like
        </span>
      </button>
      <button
        className="text-sm"
        onClick={() => {
          toggleDislike(tweetId);
        }}
      >
        {reaction.disliked ? (
          <BiSolidDislike className="text-gray-200" />
        ) : (
          <BiDislike className="text-gray-200" />
        )}

        <span className="text-gray-200 text-xs md:text-sm">
          {reaction.dislikeCount} like
        </span>
      </button>
    </div>
  );
};

export default React.memo(TweetLike);
