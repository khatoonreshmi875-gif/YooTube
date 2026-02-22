import React, { useCallback, useContext, useEffect, useState } from "react";
import { toggleVideoDislike } from "../../../Api/DislikeApi.js";
import { toggleLike } from "../../../Api/LikeApi.js";
import { AppContext } from "../../utils/contextApi.js";
import {
  SubscribeBtn,
  toggleSubcribeWithId,
} from "../../../Api/Subscription.js";
import { handleAxiosError, useAxiosErrorHandler } from "../../utils/erroeHandler.jsx";
import { useNavigate, useParams } from "react-router-dom";
import LikeDislike from "../../Tweet/UserTweet/LikeDislike.jsx";
import Button from "../../Tweet/UserTweet/Button.jsx";

const VideoLike = ({
  videoId,
  initialLikeCount,
  initialDislikeCount,
  initialLike,
  initialDislike,
  userId,
}) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
    const handleAxiosError = useAxiosErrorHandler();
  
  //usestate
  const [reaction, setReaction] = useState({
    likeCount: initialLikeCount,
    dislikeCount: initialDislikeCount,
    liked: initialLike,
    disliked: initialDislike,
  });
  const [videoState, setvideoState] = useState({
    initialState: false,
    SubscribeValue: {},
    SubValue: {},
  });
  const [loading, setLoading] = useState(false);
  // Sync reaction state when props change

  useEffect(() => {
    setReaction({
      likeCount: initialLikeCount,
      dislikeCount: initialDislikeCount,
      liked: initialLike,
      disliked: initialDislike,
    });
  }, [initialLikeCount, initialDislikeCount, initialLike, initialDislike]);

  // Fetch subscription state

  const stateOfSubscribeButton = useCallback(async (userId) => {
    const res = await SubscribeBtn(userId);
    setvideoState(() => ({
      SubValue: res.data.data.isSubscribed,
      SubscribeValue: res.data.data.isSubscribed,
    }));
  }, []);

  useEffect(() => {
    const id = user?._id || JSON.parse(localStorage.getItem("userId"));
    if (id) {
      localStorage.setItem("userId", JSON.stringify(id));
      stateOfSubscribeButton(id);
    }
  }, [user._id, stateOfSubscribeButton]); // ✅
  // Toggle subscribe

  const toggleSubscribeBtn = async (channelId) => {
    console.log("subscribe buttob ", channelId);
    setvideoState((prev) => ({
      ...prev,
      SubscribeValue: !prev.SubscribeValue,
    }));
    let res = await toggleSubcribeWithId(channelId);
    setvideoState((prev) => ({
      ...prev,
      SubscribeValue: res.data.data.subscriber,
    }));
  };

  // dislike button
  const toggleDislike = useCallback(
    async (videoId) => {
      if (loading) return; // ignore extra clicks
      setLoading(true);
      //optimistic update
      setReaction((prev) => ({
        dislikeCount: prev.disliked
          ? Math.max(prev.dislikeCount - 1, 0)
          : prev.dislikeCount + 1,
        disliked: !prev.disliked,
        likeCount: prev.liked
          ? Math.max(prev.likeCount - 1, 0)
          : prev.likeCount,
        liked: prev.liked ? false : prev.liked,
      }));
      //api call
      try {
        const result = await toggleVideoDislike(videoId).finally(() =>
          setLoading(false),
        );
        console.log("data of dislike", result);
        setReaction((prev) => ({
          dislikeCount: result.data.data.updatedVideo.videoDislikeCount,
          likeCount: result.data.data.updatedVideo.videoLikeCount,
          liked: result.data.data.likeRemoved,
          disliked: result.data.data.dislike,
        }));
      } catch (err) {
        handleAxiosError(err);
      }
    },
    [videoId, loading],
  );

  const toggleLikeVideo = useCallback(
    async (videoId) => {
      if (loading) return; // ignore extra clicks
      setLoading(true);
      //optimistic update
      setReaction((prev) => {
        return {
          likeCount: prev.liked
            ? Math.max(prev.likeCount - 1, 0)
            : prev.likeCount + 1,
          liked: !prev.liked,
          dislikeCount: prev.disliked
            ? Math.max(prev.dislikeCount - 1, 0)
            : prev.dislikeCount,
          disliked: prev.disliked ? false : prev.disliked,
        };
      });
      //api call
      try {
        const result = await toggleLike(videoId);
        setReaction((prev) => ({
          ...prev,
          dislikeCount: result?.data?.data?.updatedVideo?.videoDislikeCount,
          likeCount: result?.data?.data?.updatedVideo?.videoLikeCount,
          liked: result?.data?.data?.Liked,
          disliked: result?.data?.data?.RemoveDislike,
        }));
      } finally {
        setLoading(false);
      }
    },
    [videoId, loading],
  );
  const isCurrentlySubscribed = videoState.initialState
    ? videoState.SubscribeValue
    : videoState.SubValue;
  return (
    <div className="flex xs:space-x-8 space-x-4 xs:flex-1">
      {/* Subscribe Button */}
      <Button
        bg={
          isCurrentlySubscribed
            ? "bg-red-100 text-red-700 hover:bg-red-700 hover:text-white"
            : "bg-slate-200 text-slate-700 hover:bg-slate-400 hover:text-white"
        }
        onClick={() => {
          toggleSubscribeBtn(userId);
          setvideoState((prev) => ({ ...prev, initialState: true }));
        }}
        label={isCurrentlySubscribed ? "UnSubscribe" : "Subscribe"}
      />

      {/* Like Button */}
      <LikeDislike
        onClick={() => {
          toggleDislike(videoId);
        }}
        onClick1={() => {
          toggleLikeVideo(videoId);
        }}
        reaction={reaction}
      />
    </div>
  );
};

export default React.memo(VideoLike);
