import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TweetByTweetId, TweetDelete } from "../../../../Api/TweetApi";
import { AppContext } from "../../../utils/contextApi";
import { useAxiosErrorHandler } from "../../../utils/erroeHandler";
import Button from "../Button";

const TweetPageBtn = ({ t, setTweetData, tweetData, userId }) => {
  const { user } = useContext(AppContext);
    const handleAxiosError = useAxiosErrorHandler();
  
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
      handleAxiosError(err);
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
          <Button
            onClick={() => handleDelete(t._id)}
            bg="bg-red-100 text-red-600 hover:bg-red-600"
            label=" Delete"
          />
        )}
        <Button
          onClick={() => tweetByTweetId(t._id)}
          bg="bg-blue-100 text-blue-600 hover:bg-blue-600"
          label="Comment"
        />
       
      </div>
    </>
  );
};

export default TweetPageBtn;
