import React, { useState } from "react";
import {
  deleteComment,
  getCommentById,
  getEditcomment,
} from "../../../../Api/CommentApi.js";
import { handleAxiosError } from "../../../utils/erroeHandler.jsx";
import { useNavigate } from "react-router-dom";
const EditDeleteComment = ({
  setCommentsWithLikes,
  setgetreplied,
  c,
  index,
  IsOpen,
  setIsOpen,
}) => {
  const [comment, setComment] = useState("");
  const [Edit, setEdit] = useState(null);
  const navigate = useNavigate();
  const getComment = async (commentId) => {
    const res = await getCommentById(commentId);
    setComment(res.data.data.content);
  };
  const handleEditCommment = async (commentId, userdata) => {
    // Optimistic update

    setgetreplied((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? { ...comment, content: userdata.content }
          : comment,
      ),
    );
    setCommentsWithLikes((prev) =>
      prev.map((comment) =>
        comment._id === commentId
          ? { ...comment, content: userdata.content }
          : comment,
      ),
    );
    try {
      await getEditcomment(commentId, userdata);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  const handleDeleteCommment = async (commentId) => {
    try {
      //optimistic update
      setCommentsWithLikes((prev) =>
        prev.filter((comment) => comment._id !== commentId),
      );
      setgetreplied((prev) => prev.filter((reply) => reply._id !== commentId));
      //api call
      const res = await deleteComment(commentId);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  return (
    <div className="relative">
      {IsOpen && (
        <div>
          <div
            className="flex flex-col items-end space-y-2 rounded-lg shadow-md 
                      w-fit sm:p-6 p-3 absolute z-50 right-5 bottom-0 
                      bg-white border border-slate-200"
          >
            <button
              className="sm:text-sm text-xs text-blue-600 hover:text-blue-800 transition-colors"
              onClick={async () => {
                await getComment(c._id);
                setEdit(index);
                setIsOpen(false);
              }}
            >
              Edit
            </button>
            <button
              className="sm:text-sm text-xs text-red-600 hover:text-red-800 transition-colors"
              onClick={() => {
                handleDeleteCommment(c._id);
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {Edit === index ? (
        <div className="sm:mt-2 mt-1">
          <input
            type="text"
            value={comment || ""}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-slate-300 rounded px-2 py-1 
                   focus:outline-none focus:ring-2 focus:ring-blue-500  sm:text-sm text-xs"
          />
          <div className="flex space-x-4 justify-end mt-2">
            <button
              className=" text-blue-600 bg-blue-100 px-3 py-1 rounded hover:text-white p hover:bg-blue-600 transition-colors  sm:text-sm text-xs shadow-sm shadow-blue-600"
              onClick={() => {
                handleEditCommment(c._id, { content: comment?.trim() });
                setEdit(false);
              }}
            >
              Save
            </button>
            <button
              className="bg-slate-100 text-slate-600 hover:text-white px-3 py-1 rounded hover:bg-slate-500 transition-colors sm:text-sm text-xs shadow-sm shadow-slate-600"
              onClick={() => setEdit(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="text-slate-800 mt-3 ml-4 xs:text-sm text-[13px]">
          {c.content}
        </div>
      )}
    </div>
  );
};

export default EditDeleteComment;
