import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTweetCommentById } from "../../../Api/CommentApi";
import { TweetByTweetId } from "../../../Api/TweetApi";
import { useAxiosErrorHandler } from "../../utils/erroeHandler";
import Maincomment from "./HomeTweetComponent/MainComment";
import MainPage from "./HomeTweetComponent/mainPage/MainPage";
import LoadingSpinner from "../../utils/LoadingSpinner";
const MainTweetPage = () => {
  const [tweetData, setTweetData] = useState(null);
  const location = useLocation();
  const handleAxiosError = useAxiosErrorHandler();

  const { tweet } = location.state || {};
  const navigate = useNavigate();
  const { tweetId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await TweetByTweetId(tweetId);
        setTweetData(res.data.data);
      } catch (err) {
        handleAxiosError(err);
      }
    };

    if (!tweet && tweetId) {
      fetchTweet();
    } else if (tweet) {
      setTweetData(tweet);
    }
  }, [tweet, tweetId]);

  if (tweetData === null) {
    return <LoadingSpinner label="Fetching " />;
  }

  return (
    <div>
      <>
        <div className="lg:w-1/3 md:w-2/3 sm:w-3/4 w-full mx-auto sm:mb-0 mb-24 h-auto ">
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
