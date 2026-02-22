import React from "react";
import { useState } from "react";
import { handleAxiosError, useAxiosErrorHandler } from "../../../utils/erroeHandler";
import { useNavigate } from "react-router-dom";

const Replycomment = ({
  isNested,
  handleRepliedComment,
  setAllreply,
  c,
  replyApi,
  index,
  allData,
  setgetreplied,
  setCommentsWithLikes,
  className,
}) => {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [content, setcontent] = useState("");
  const navigate = useNavigate();
    const handleAxiosError = useAxiosErrorHandler();
  
  const handleReplyCommment = async (commentId, userdata) => {
    try {
      const tempId = Date.now() + Math.floor(Math.random() * 999999);
      setgetreplied((prev) => [allData(content, tempId, commentId), ...prev]);
      const res = await replyApi(commentId, userdata);
      const created = res.data.data;
      setgetreplied((prev) =>
        prev.map((c) => (c._id === tempId ? created : c)),
      );
    } catch (err) {
      setgetreplied((prev) => prev.filter((p) => p._id !== tempId));
      handleAxiosError(err);
    }
  };
  const increaseReplyCount = (commentId) => {
    setCommentsWithLikes((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? { ...comment, ReplyCount: comment.ReplyCount + 1 }
          : comment,
      ),
    );
  };
  console.log("comment id of ", c._id);
  const increaseNestedReplyComment = (commentId) => {
    setCommentsWithLikes((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? { ...comment, ReplyCount: comment.ReplyCount + 1 }
          : comment,
      ),
    );
  };
  return (
    <div>
      <div className={`flex flex-col space-y-2 ${className}`}>
        <button
          onClick={() => setActiveReplyId(index)}
          className="text-blue-600 hover:underline sm:text-sm  text-xs w-fit mx-auto"
        >
          Reply
        </button>
        {activeReplyId === index && (
          <div className="flex flex-col space-y-2 mt-2 ">
            <input
              type="text"
              placeholder="Reply here..."
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              className="w-full border-b-2 border-gray-400 focus:border-slate-300 focus:outline-none px-2 py-1 rounded-lg sm:text-sm  text-xs"
            />
            <div className="flex space-x-3 justify-end">
              <button
                onClick={async () => {
                  if (isNested) {
                    increaseNestedReplyComment(c._id);
                  } else {
                    increaseReplyCount(c._id);
                    setgetreplied([]);
                  }
                  await Promise.resolve();
                  handleReplyCommment(c._id, { content });
                  handleRepliedComment(c._id);
                  setAllreply(index);
                  setActiveReplyId(null);
                  setcontent("");
                }}
                className="hover:text-white px-3 py-1 rounded bg-blue-100 text-blue-600  hover:bg-blue-600 sm:text-sm  text-xs shadow-sm shadow-blue-600 active:shadow-transparent hover:shadow-black"
              >
                Reply
              </button>
              <button
                onClick={() => setActiveReplyId(null)}
                className="bg-slate-100 text-slate-600  hover:text-white px-3 py-1 rounded hover:bg-slate-500  sm:text-sm  text-xs shadow-sm shadow-slate-600  hover:shadow-black active:shadow-transparent "
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Replycomment;
