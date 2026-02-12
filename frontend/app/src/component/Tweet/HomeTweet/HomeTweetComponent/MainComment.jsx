import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  AddTweetComment,
  getTweetCommentById,
  ReplyTweetComment,
} from "../../../../Api/CommentApi";
import { AppContext } from "../../../utils/contextApi";

import { useNavigate } from "react-router-dom";
import { handleAxiosError } from "../../../utils/erroeHandler";
import Comment from "../../../watch/watchComment/Comment";
import AddComments from "../../../watch/watchComment/Comment/AddComment";
import CommentSkeleton from "../../../watch/watchComment/CommentSkeleton";

const Maincomment = ({ tweetId }) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

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

  useEffect(() => {
    if (tweetId) {
      hasNomore.current = false;
      setCommentsWithLikes([]);

      hasFetchedFirst.current = false;
    }
  }, []);

  // handlers
  const addcomment = useCallback(
    async (userdata) => {
      try {
        const res = await AddTweetComment(tweetId, userdata);

        setCommentsWithLikes((prev) => [
          allData(contentData, res.data.data._id),
          ...prev,
        ]);
      } catch (err) {
        handleAxiosError(err, navigate);
      }
    },
    [contentData],
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
          addcomment(tweetId, { content: contents });
          setcontents("");
        }}
        setcontents={setcontents}
        contents={contents}
      />

      {commentsWithLikes?.map((c, index) => (
        <Comment
          key={index}
          index={index}
          c={c}
          isNested={false}
          replyApi={ReplyTweetComment}
          commentsWithLikes={commentsWithLikes}
          setCommentsWithLikes={setCommentsWithLikes}
        />
      ))}

      {hasNomore.current && (
        <p className="text-2xl text-center  font-serif w-full bg-slate-700">
          No more are available
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
