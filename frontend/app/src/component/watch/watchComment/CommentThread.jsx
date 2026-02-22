import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddComment,
  getAllCommentOfSpecificVideo,
  getReplycomment,
} from "../../../Api/CommentApi";
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll";
import { AppContext } from "../../utils/contextApi";
import { useAxiosErrorHandler } from "../../utils/erroeHandler";
import Comment from "./Comment";
import AddComments from "./Comment/AddComment";
import CommentSkeleton from "./CommentSkeleton";
const CommentThread = () => {
  const navigate = useNavigate();
  const { user, FormatTime } = useContext(AppContext);
  const handleAxiosError = useAxiosErrorHandler();

  //usestate
  const [count, setCount] = useState(0);
  const [commentsWithLikes, setCommentsWithLikes] = useState([]);
  const [contentData, setcontentData] = useState("");
  const [contents, setcontents] = useState("");
  const [loading, setloading] = useState(false);

  //useRef
  const hasNomore = useRef(false);
  const hasFetchedFirst = useRef(false);

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
    FetchComment(videoId);
    hasFetchedFirst.current = true;
  }, [videoId]);

  const FetchComment = async (videoId) => {
    const res = await getAllCommentOfSpecificVideo(videoId, 0);
    setCommentsWithLikes(res.data.data);
  };
  const addcomment = useCallback(
    async (videoId, userdata) => {
      const text = (userdata?.content || "").trim();
      if (!text) return;

      // generate a unique temporary id per call
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

      // optimistic update
      setCommentsWithLikes((prev) => [allData(text, tempId), ...prev]);

      try {
        const res = await AddComment(videoId, { content: text });
        const created = res?.data?.data;

        if (created && created._id) {
          setCommentsWithLikes((prev) =>
            prev.map((c) => (c._id === tempId ? created : c)),
          );
        }
      } catch (err) {
        setCommentsWithLikes((prev) => prev.filter((c) => c._id !== tempId));
        console.error("Comment add failed", err);
        handleAxiosError(err);
      }
    },
    [allData, handleAxiosError],
  );

  //call api when it hit the bottom of similar video

  const api = useCallback(
    async (videoId, newValue = 0) => {
      try {
        if (!videoId) {
          return;
        }
        setloading(true);
        if (videoId) {
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
        handleAxiosError(err);
      }
    },
    [videoId],
  );
  const {} = useInfiniteScroll({
    fn: (page) => api(videoId, page),
    hasFetchedFirst,
    hasNomore,
  });

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
            key={c._id}
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
        <p className="sm:text-xl text-sm text-center text-blue-600  font-serif w-full bg-blue-100 ">
          No comments are available
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
