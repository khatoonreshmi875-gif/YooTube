import React from "react";
import { useState } from "react";

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
  const handleReplyCommment = async (commentId, userdata) => {
    const res = await replyApi(commentId, userdata);
    setgetreplied((prev) => [
      allData(content, res?.data?.data?._id, commentId),
      ...prev,
    ]);
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
              className="w-full border-b-2 border-gray-400 focus:border-blue-500 focus:outline-none px-2 py-1 rounded-lg sm:text-sm  text-xs"
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
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 sm:text-sm  text-xs"
              >
                Reply
              </button>
              <button
                onClick={() => setActiveReplyId(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500  sm:text-sm  text-xs"
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
