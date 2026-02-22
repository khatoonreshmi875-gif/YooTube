import React, { useContext, useEffect, useState } from "react";

import { GetAllRepliedComment } from "../../../Api/CommentApi.js";
import { AppContext } from "../../utils/contextApi.js";
import CommentHeader from "./Comment/CommentHeader.jsx";
import CommentLike from "./Comment/CommentLike.jsx";
import EditDeleteComment from "./Comment/EditDeleteComment.jsx";
import Replycomment from "./Comment/Replycomment.jsx";

import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { useAxiosErrorHandler } from "../../utils/erroeHandler.jsx";

const Comment = ({ c, index, isNested, replyApi, setCommentsWithLikes }) => {
  const { user } = useContext(AppContext);
  const handleAxiosError = useAxiosErrorHandler();

  //usestate
  const [count, setcount] = useState(0);
  const [getreplied, setgetreplied] = useState([]);
  const [Allreply, setAllreply] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  // Helper: build reply object

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

  // Initialize replies if present

  useEffect(() => {
    if (Array.isArray(c.replies) && c.replies.length > 0) {
      setgetreplied(c.replies);
    }
  }, [c.replies]);
  // Fetch replies from API

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
      handleAxiosError(err);
    }
  };

  return (
    <div
      className={`${
        isNested
          ? "bg-slate-50 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
          : "bg-white border border-slate-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ml-4"
      }`}
    >
      <div className={`flex flex-col ${isNested ? "p-5" : "py-5 px-3"}`}>
        {/* Header */}

        <CommentHeader
          c={c}
          isNested={isNested}
          setIsOpen={setIsOpen}
          IsOpen={IsOpen}
        />
        {/* Edit/Delete */}

        <EditDeleteComment
          setgetreplied={setgetreplied}
          setCommentsWithLikes={setCommentsWithLikes}
          c={c}
          index={index}
          IsOpen={IsOpen}
          setIsOpen={setIsOpen}
        />
        {/* Like + Reply Toggle */}

        <div className="flex items-center  mt-8 mb-[-1rem]  text-slate-700 w-full justify-between  ">
          <CommentLike c={c} isNested={isNested} />

          <div
            className="lg:text-base   xs:text-sm text-xs font-medium text-blue-600 mt-2 active:text-blue-400 p-2 "
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
            <button className="flex items-center space-x-1">
              <div className="flex lg:text-base   xs:text-sm text-xs  ">
                {c.ReplyCount > 1
                  ? `${c.ReplyCount} replies`
                  : `${c.ReplyCount} reply`}
                <ChevronRightIcon className=" sm:w-5 w-3 aspect-square mt-0.5 text-blue-600" />
              </div>
            </button>
          </div>
        </div>
        {/* Reply Input */}

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

        {/* Replies List */}

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

export default React.memo(Comment);
