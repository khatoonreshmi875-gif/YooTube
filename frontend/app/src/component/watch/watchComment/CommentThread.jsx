import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AddComment,
  getAllCommentOfSpecificVideo,
  getReplycomment,
} from "../../../Api/CommentApi";
import { AppContext } from "../../utils/contextApi";
import Comment from "./Comment";
import AddComments from "./Comment/AddComment";
import CommentSkeleton from "./CommentSkeleton";
import { handleAxiosError } from "../../utils/erroeHandler";
const CommentThread = () => {
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const hasNomore = useRef(false);
  //views increasing
  const hasFetchedFirst = useRef(false);
  const { user, FormatTime } = useContext(AppContext);
  const [commentsWithLikes, setCommentsWithLikes] = useState([]);

  const [contentData, setcontentData] = useState("");
  const [contents, setcontents] = useState("");
  const allData = (data, id) => {
    return {
      owner: { channelName: user?.channelName, avatar: user?.avatar },
      createdAt: new Date().toISOString(),
      _id: id,
      content: data,
      likedBy: [],
      CommentlikeCount: 0,
      CommentDislikeCount: 0,
      isLikedByCurrentUser: false,
      isDislikedByCurrentUser: false,
      ReplyCount: 0,
    };
  };
  const { videoId } = useParams();

  useEffect(() => {
    console.log("curr video id", videoId);
  }, [videoId]);

  useEffect(() => {
    if (videoId) {
      hasNomore.current = false;
      setCommentsWithLikes([]);

      hasFetchedFirst.current = false;
    }
  }, [videoId]);
  console.log("add comment");
  const addcomment = useCallback(
    async (videoId, userdata) => {
      const res = await AddComment(videoId, userdata);
      console.log("add comment", res.data.data);

      setCommentsWithLikes((prev) => [
        allData(contentData, res.data.data._id),
        ...prev,
      ]);
    },
    [contentData],
  );
  console.log("Child received replyApi:", getReplycomment);

  //call api when it hit the bottom of similar video

  const api = useCallback(
    async (videoId, newValue = 0) => {
      try {
        if (!videoId) {
          console.warn("videoId not ready yet");
          return;
        }
        setloading(true);
        if (videoId) {
          console.log("video/id", videoId);
          const res = await getAllCommentOfSpecificVideo(
            videoId,
            newValue,
          ).finally(() => setloading(false));

          if (res.data.data.length === 0) {
            hasNomore.current = true;
          }

          setCommentsWithLikes((prev) => [...prev, ...(res.data.data || [])]);
        }
      } catch (err) {
        handleAxiosError(err, navigate);
      }
    },
    [videoId],
  );

  const handleScroll = useCallback(() => {
    if (hasFetchedFirst.current === false) {
      api(videoId, 0);
      hasFetchedFirst.current = true;
    }

    if (
      window.scrollY + window.innerHeight >= document.body.scrollHeight &&
      hasNomore.current === false &&
      hasFetchedFirst.current === true
    ) {
      setCount((prev) => {
        const newValue = prev + 1;
        //console.log("add value count increae", videoId);
        api(videoId, newValue);
        return newValue;
      });
    }
  }, [api, videoId]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <AddComments
        onChange={(e) => {
          setcontents(e.target.value);
          setcontentData(e.target.value);
        }}
        onClick={() => {
          addcomment(videoId, { content: contents });
          setcontents("");
        }}
        setcontents={setcontents}
        contents={contents}
      />
      {/* Input */}
      <div className="w-full">
        {commentsWithLikes?.map((c, index) => (
          <Comment
            key={index}
            index={index}
            c={c}
            isNested={false}
            replyApi={getReplycomment}
            commentsWithLikes={commentsWithLikes}
            setCommentsWithLikes={setCommentsWithLikes}
          />
        ))}
      </div>
      {hasNomore.current && (
        <p className="text-2xl text-center  font-serif w-full bg-slate-700">
          No more are available
        </p>
      )}
      {loading && (
        <div className="w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread;
