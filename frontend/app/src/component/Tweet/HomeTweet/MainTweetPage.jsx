import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTweetCommentById } from "../../../Api/CommentApi";
import { TweetByTweetId } from "../../../Api/TweetApi";
import { handleAxiosError } from "../../utils/erroeHandler";
import Maincomment from "./HomeTweetComponent/MainComment";
import MainPage from "./HomeTweetComponent/mainPage/MainPage";

const MainTweetPage = () => {
  const [tweetData, setTweetData] = useState();
  const location = useLocation();
  const { tweet } = location.state || {};
  const navigate = useNavigate();
  const { tweetId } = useParams();

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await TweetByTweetId(tweetId);
        setTweetData(res.data.data);
      } catch (err) {
        handleAxiosError(err, navigate);
      }
    };

    if (!tweet && tweetId) {
      fetchTweet();
    } else if (tweet) {
      setTweetData(tweet);
    }
  }, [tweet, tweetId]);

  return (
    <div>
      <>
        <div className="lg:w-1/3 md:w-2/3 sm:w-3/4 w-full mx-auto sm:mb-0 mb-24 ">
          {" "}
          <MainPage tweet={tweetData} />
          {tweetData?._id && (
            <div>
              <Maincomment
                tweetId={tweetData._id}
                replyApi={getTweetCommentById}
              />
            </div>
          )}
        </div>
      </>
      {/* )} */}
    </div>
  );
};
export default MainTweetPage;
