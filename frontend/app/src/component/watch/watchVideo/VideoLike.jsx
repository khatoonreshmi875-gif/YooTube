import React, { useCallback, useContext, useEffect, useState } from "react";
import { toggleVideoDislike } from "../../../Api/DislikeApi.js";
import { toggleLike } from "../../../Api/LikeApi.js";

import { ThumbsUp,ThumbsDown  } from "lucide-react";
import { AppContext } from "../../utils/contextApi.js";
import {
  SubscribeBtn,
  toggleSubcribeWithId,
} from "../../../Api/Subscription.js";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";

const VideoLike = ({
  videoId,
  initialLikeCount,
  initialDislikeCount,
  initialLike,
  initialDislike,
}) => {
  const [reaction, setreaction] = useState({
    likeCount: initialLikeCount,
    dislikeCount: initialDislikeCount,
    liked: initialLike,
    disliked: initialDislike,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setreaction({
      likeCount: initialLikeCount,
      dislikeCount: initialDislikeCount,
      liked: initialLike,
      disliked: initialDislike,
    });
  }, [initialLikeCount, initialDislikeCount, initialLike, initialDislike]);

  const { userId, user } = useContext(AppContext);
  const [videoState, setvideoState] = useState({
    initialState: false,
    SubscribeValue: {},
    SubValue: {},
  });
  console.log("page of videolike render");
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
  const toggleSubscribeBtn = useCallback(async (channelId) => {
    setvideoState((prev) => ({
      ...prev,
      SubscribeValue: !prev.SubscribeValue,
    }));
    let res = await toggleSubcribeWithId(channelId);
    setvideoState((prev) => ({
      ...prev,
      SubscribeValue: res.data.data.subscriber,
    }));
  }, []);

  // dislike button
  const toggleDislike = useCallback(
    async (videoId) => {
      if (loading) return; // ignore extra clicks
      setLoading(true);

      setreaction((prev) => ({
        dislikeCount: prev.disliked
          ? Math.max(prev.dislikeCount - 1, 0)
          : prev.dislikeCount + 1,
        disliked: !prev.disliked,
        likeCount: prev.liked
          ? Math.max(prev.likeCount - 1, 0)
          : prev.likeCount,
        liked: prev.liked ? false : prev.liked,
      }));
      try {
        const result = await toggleVideoDislike(videoId).finally(() =>
          setLoading(false),
        );
        console.log("data of dislike", result);
        setreaction((prev) => ({
          dislikeCount: result.data.data.updatedVideo.videoDislikeCount,
          likeCount: result.data.data.updatedVideo.videoLikeCount,
          liked: result.data.data.likeRemoved,
          disliked: result.data.data.dislike,
        }));
      } catch (err) {
        handleAxiosError(err, navigate);
      }
    },
    [videoId, loading],
  );

  const toggleLikeVideo = useCallback(
    async (videoId) => {
      if (loading) return; // ignore extra clicks
      setLoading(true);

      setreaction((prev) => {
        //console.log("liked", prev.liked);
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
      try {
        const result = await toggleLike(videoId);
        setreaction((prev) => ({
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
    <div className="flex xs:space-x-8 space-x-4 xs:flex-1 ">
      <button
        className="bg-red-700 text-white px-2 py-0.5 rounded-md  border-white/40 hover:border-black font-serif text-xs sm:text-base "
        onClick={() => {
          toggleSubscribeBtn(userId);
          setvideoState((prev) => ({
            ...prev,
            initialState: true,
          }));
        }}
      >
        {isCurrentlySubscribed ? "Subscribed" : "UnSubscribe"}
      </button>

      <button
        onClick={() => {
          toggleLikeVideo(videoId);
        }}
      >
        {
          <>
            <div className="flex items-center  text-white space-x-2   ">
              <p>
                {reaction.liked ? (
                  <ThumbsUp fill="white" stroke="white" size={16} />
                ) : (
                  <ThumbsUp size={16} />
                )}
              </p>

              <p className="text-sm ">{reaction.likeCount}</p>
            </div>
          </>
        }
      </button>
      <button
        onClick={() => {
          toggleDislike(videoId);
        }}
      >
        {
          <>
            <div className="flex items-center  text-white space-x-2    ">
              <p>
                {reaction.disliked ? (
                  <ThumbsDown fill="white" stroke="white" size={16} />
                ) : (
                  <ThumbsDown size={16} />
                )}
              </p>

              <p className="text-sm ">{reaction.dislikeCount}</p>
            </div>
          </>
        }
      </button>
    </div>
  );
};

export default React.memo(VideoLike);
