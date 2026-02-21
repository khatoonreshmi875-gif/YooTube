import { useState } from "react";
import { toggleDislikeComment } from "../../../../Api/DislikeApi";

import { toggleLikeComment } from "../../../../Api/LikeApi";
import LikeDislike from "../../../Tweet/UserTweet/LikeDislike";
const CommentLike = ({ c, isNested }) => {
  const [reaction, setReaction] = useState(() => {
    return {
      likeCount: c.CommentlikeCount,
      dislikeCount: c.CommentDislikeCount,
      liked: c.isLikedByCurrentUser,
      disliked: c.isDislikedByCurrentUser,
    };
  });

  //toggle like
  const toggleLike = async (commentId) => {
    // Optimistic update

    setReaction((prev) => {
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
    //api call
    const result = await toggleLikeComment(commentId);

    setReaction({
      likeCount: result.data.data.updatedComment.CommentlikeCount,
      dislikeCount: result.data.data.updatedComment.CommentDislikeCount,
      liked: result.data.data.Liked,
      disliked: result.data.data.RemoveDislike,
    });
  };
  //toggle dislike
  const toggleDislike = async (commentId) => {
    //optimistic update
    setReaction((prev) => ({
      dislikeCount: Math.max(
        0,
        prev.disliked ? prev.dislikeCount - 1 : prev.dislikeCount + 1,
      ),
      disliked: !prev.disliked,
      likeCount: Math.max(0, prev.liked ? prev.likeCount - 1 : prev.likeCount),
      liked: prev.liked ? false : prev.liked,
    }));
    //api call
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
