import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  AddTweetComment,
  getTweetCommentById,
  ReplyTweetComment,
} from "../../../../Api/CommentApi";
import { AppContext } from "../../../utils/contextApi";

import { useNavigate } from "react-router-dom";
import { handleAxiosError, useAxiosErrorHandler } from "../../../utils/erroeHandler";
import Comment from "../../../watch/watchComment/Comment";
import AddComments from "../../../watch/watchComment/Comment/AddComment";
import CommentSkeleton from "../../../watch/watchComment/CommentSkeleton";

const Maincomment = ({ tweetId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
    const handleAxiosError = useAxiosErrorHandler();
  

  // useState

  const [contentData, setcontentData] = useState("");
  const [contents, setcontents] = useState("");
  const [commentsWithLikes, setCommentsWithLikes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);

  // useRef
  const hasFetchedFirst = useRef(false);
  const hasNomore = useRef(false);

  // helpers

  const allData = (data, id) => {
    return {
      owner: { channelName: user?.channelName, avatar: user?.avatar },
      createdAt: new Date().toISOString(),
      _id: id,
      content: data,
      likedBy: [],
      CommentlikeCount: 0,
      CommentDislikeCount: 0,
      ReplyCount: 0,
    };
  };

  // effects

  // handlers
  const addcomment = useCallback(
    async (tweetId, userdata) => {
      const tempId = Date.now() + Math.floor(Math.random() * 999999);
      setCommentsWithLikes((prev) => [allData(userdata, tempId), ...prev]);
      try {
        const res = await AddTweetComment(tweetId, { content: userdata });
        const created = res.data.data;
        if (created) {
          setCommentsWithLikes((prev) =>
            prev.map((p) => (p._id === tempId ? created : p)),
          );
        }
      } catch (err) {
        setCommentsWithLikes((prev) => prev.filter((m) => m._id !== tempId));
        handleAxiosError(err);
      }
    },
    [contentData, allData, tweetId],
  );

  // handlers

  //call api when it hit the bottom of similar video

  const api = useCallback(
    async (tweetId, newValue = 0) => {
      setloading(true);
      if (tweetId) {
        const res = await getTweetCommentById(tweetId, newValue).finally(() =>
          setloading(false),
        );

        if (res.data.data.length === 0) {
          hasNomore.current = true;
        }

        setCommentsWithLikes((prev) => [...prev, ...(res.data.data || [])]);
      }
    },
    [tweetId],
  );

  const handleScroll = useCallback(() => {
    if (hasFetchedFirst.current === false) {
      api(tweetId, 0);
      hasFetchedFirst.current = true;
    }

    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      hasNomore.current === false &&
      hasFetchedFirst.current === true
    ) {
      setCount((prev) => {
        const newValue = prev + 1;

        api(tweetId, newValue);
        return newValue;
      });
    }
  }, [api, tweetId]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div className="w-full ">
      <AddComments
        onChange={(e) => {
          setcontents(e.target.value);
          setcontentData(e.target.value);
        }}
        onClick={() => {
          addcomment(tweetId, contents);
          setcontents("");
        }}
        setcontents={setcontents}
        contents={contents}
      />

      {commentsWithLikes?.map((c, index) => (
        <Comment
          key={c._id}
          index={index}
          c={c}
          isNested={false}
          replyApi={ReplyTweetComment}
          commentsWithLikes={commentsWithLikes}
          setCommentsWithLikes={setCommentsWithLikes}
        />
      ))}

      {hasNomore.current && (
        <p className="sm:text-xl text-sm text-center text-blue-600   w-full bg-blue-100 ">
          No comment are available
        </p>
      )}
      {!tweetId && loading && (
        <div>
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Maincomment;
