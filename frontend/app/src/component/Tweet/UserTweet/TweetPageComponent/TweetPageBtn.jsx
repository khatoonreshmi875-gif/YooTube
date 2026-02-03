import React from "react";
import { TweetByTweetId, TweetDelete } from "../../../../Api/TweetApi";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../utils/contextApi";

const TweetPageBtn = ({ t, setTweetData, tweetData, userId }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const tweetByTweetId = async (tweetId) => {
    const res = await TweetByTweetId(tweetId);
    navigate(`/main-tweet/${tweetId}`, {
      state: { tweet: res.data.data },
    });
  };
  const handleDelete = async (tweetId) => {
    const toastId = toast.loading("Deleting video...");
    const prevData = tweetData;
    try {
      setTweetData((prev) => prev.filter((f) => f._id !== t._id));
      const result = await TweetDelete(tweetId);
      toast.update(toastId, {
        render: "Video deleted ✅",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      setTweetData(prevData);
      handleAxiosError(err, navigate);
      toast.update(toastId, {
        render: "Failed to delete ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      {" "}
      <div className="flex justify-between items-center mt-4">
        {(user._id === userId ||
          user.role === "admin" ||
          user.role === "moderator") && (
          <button
            onClick={() => handleDelete(t._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md  md:text-sm font-medium transition-colors duration-200 text-xs"
          >
            Delete
          </button>
        )}

        <p
          onClick={() => tweetByTweetId(t._id)}
          className="cursor-pointer md:text-sm font-medium text-xs bg-white text-indigo-600 px-3 py-1 rounded-md  hover:bg-indigo-100 transition-colors duration-200
"
        >
          Comment
        </p>
      </div>
    </>
  );
};

export default TweetPageBtn;
