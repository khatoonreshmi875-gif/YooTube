import React from "react";
import { useContext, useRef, useState, useEffect } from "react";
import {
  stateOfCommentDislike,
  toggleDislikeComment,
} from "../../../../Api/DislikeApi";

import { BiLike, BiSolidLike, BiSolidDislike, BiDislike } from "react-icons/bi";
import { stateOfCommentLike, toggleLikeComment } from "../../../../Api/LikeApi";
import LikeDislike from "../../../Tweet/UserTweet/LikeDislike";
const CommentLike = ({ c, isNested }) => {
  const [hasToggledLikeComment, sethasToggledLikeComment] = useState(false);
  const [commentBtnstate, setcommentBtnstate] = useState([]);

  const [initialStateDislike, setinitialStateDislike] = useState([]);
  const [reaction, setReaction] = useState(() => {
    return {
      likeCount: c.CommentlikeCount,
      dislikeCount: c.CommentDislikeCount,
      liked: c.isLikedByCurrentUser,
      disliked: c.isDislikedByCurrentUser,
    };
  });

  const toggleLike = async (commentId) => {
    setReaction((prev) => {
      //console.log("liked", prev.liked);
      return {
        likeCount: Math.max(
          0,
          prev.liked ? prev.likeCount - 1 : prev.likeCount + 1,
        ),
        liked: !prev.liked,
        dislikeCount: Math.max(
          0,
          prev.disliked ? prev.dislikeCount - 1 : prev.dislikeCount,
        ),
        disliked: prev.disliked ? false : prev.disliked,
      };
    });

    const result = await toggleLikeComment(commentId);
    setReaction({
      likeCount: result.data.data.updatedComment.CommentlikeCount,
      dislikeCount: result.data.data.updatedComment.CommentDislikeCount,
      liked: result.data.data.Liked,
      disliked: result.data.data.RemoveDislike,
    });
  };
  const toggleDislike = async (commentId) => {
    setReaction((prev) => ({
      dislikeCount: Math.max(
        0,
        prev.disliked ? prev.dislikeCount - 1 : prev.dislikeCount + 1,
      ),
      disliked: !prev.disliked,
      likeCount: Math.max(0, prev.liked ? prev.likeCount - 1 : prev.likeCount),
      liked: prev.liked ? false : prev.liked,
    }));
    const result = await toggleDislikeComment(commentId);

    setReaction({
      likeCount: result.data.data.updatedComment.CommentlikeCount,
      dislikeCount: result.data.data.updatedComment.CommentDislikeCount,
      liked: result.data.data.likeRemoved,
      disliked: result.data.data.dislike,
    });
  };

  return (
    <>
      <LikeDislike
        onClick={() => {
          toggleDislike(c._id);
        }}
        onClick1={() => {
          toggleLike(c._id);
        }}
        reaction={reaction}
      />
    </>
  );
};

export default CommentLike;
