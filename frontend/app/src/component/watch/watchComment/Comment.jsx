import React, { useContext, useRef, useState, useEffect } from "react";

import { GetAllRepliedComment } from "../../../Api/CommentApi.js";
import CommentLike from "./Comment/CommentLike.jsx";
import EditDeleteComment from "./Comment/EditDeleteComment.jsx";
import CommentHeader from "./Comment/CommentHeader.jsx";
import Replycomment from "./Comment/Replycomment.jsx";
import { AppContext } from "../../utils/contextApi.js";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";

const Comment = ({ c, index, isNested, replyApi, setCommentsWithLikes }) => {
  const { user } = useContext(AppContext);
  const [count, setcount] = useState(0);
  const [getreplied, setgetreplied] = useState([]);
  const [Allreply, setAllreply] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const allData = (data, id, commentId) => {
    return {
      owner: { channelName: user?.channelName, avatar: user?.avatar },
      _id: id,
      content: data,
      isLikedByCurrentUser: false,
      isDislikedByCurrentUser: false,
      CommentlikeCount: 0,
      CommentDislikeCount: 0,
      ReplyCount: 0,
      parent: commentId,
      createdAt: new Date().toISOString(),
    };
  };
  useEffect(() => {
    if (Array.isArray(c.replies) && c.replies.length > 0) {
      setgetreplied(c.replies);
    }
  }, [c.replies]);
  const handleRepliedComment = async (commentId, page = 0) => {
    try {
      const res = await GetAllRepliedComment(commentId, page);
      setgetreplied((prev) => {
        if (!hasFetched) {
          setHasFetched(true);
          return res.data.data;
        }
        if (page === 0) {
          return res.data.data;
        }
        return [...prev, ...res.data.data];
      });
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div
      className={`${
        isNested
          ? "  bg-gradient-to-br from-black via-cyan-950 to-black  rounded-lg shadow-sm hover:from-cyan-900 hover:via-gray-900 hover:to-cyan-950  "
          : "bg-gradient-to-tl from-slate-800 via-black to-slate-800 rounded-xl shadow-md  hover:shadow-lg transition pb-1 hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 shadow-blue-200 hover:shadow-blue-300 hover-shadow-md  ml-4 "
      }`}
    >
      <div className={`flex flex-col ${isNested ? "p-5" : "py-5 px-3"}`}>
        <CommentHeader
          c={c}
          isNested={isNested}
          setIsOpen={setIsOpen}
          IsOpen={IsOpen}
        />
        <EditDeleteComment
          setgetreplied={setgetreplied}
          setCommentsWithLikes={setCommentsWithLikes}
          c={c}
          index={index}
          IsOpen={IsOpen}
          setIsOpen={setIsOpen}
        />

        <div className="flex items-center  mt-8 mb-[-0.8rem] text-sm text-gray-700 w-full justify-between  ">
          <CommentLike c={c} isNested={isNested} />

          <div
            className="text-sm font-medium text-blue-600 mt-2 active:text-blue-300 p-2 "
            onClick={() => {
              setAllreply((prev) => {
                const state = prev === null ? index : null;
                if (state === index) {
                  handleRepliedComment(c._id, count);
                } else {
                  setgetreplied([]); // clear replies
                  setHasFetched(false); // reset flag
                  setcount(0);
                }
                return state;
              });
            }}
          >
            <button className="flex">
              <div className="flex xs:text-sm text-[13px]  ">
                {c.ReplyCount > 1
                  ? `${c.ReplyCount} replies`
                  : `${c.ReplyCount} reply`}
                <ChevronRightIcon className="h-5 w-5 mt-1" />
              </div>
            </button>
          </div>
        </div>

        <Replycomment
          isNested={isNested}
          handleRepliedComment={handleRepliedComment}
          setAllreply={setAllreply}
          c={c}
          replyApi={replyApi}
          index={index}
          allData={allData}
          setgetreplied={setgetreplied}
          setCommentsWithLikes={setCommentsWithLikes}
        />

        {/* Replies */}
        <div className="mt-4">
          {Allreply === index &&
            getreplied?.map((reply, idx) => (
              <Comment
                key={`${reply._id}-${idx}`}
                index={idx}
                c={reply}
                isNested={true}
                replyApi={replyApi}
                setCommentsWithLikes={setgetreplied}
                className="w-full"
              />
            ))}
          {Allreply === index && getreplied?.length > 0 && (
            <button
              onClick={() => {
                setcount((prev) => {
                  const newCount = prev + 1;
                  handleRepliedComment(c._id, newCount);
                  return newCount;
                });
              }}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              View more replies
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
