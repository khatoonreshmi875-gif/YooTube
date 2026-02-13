import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TweetPageApi } from "../../../Api/TweetApi.js";
import { AppContext } from "../../utils/contextApi.js";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import LoadingSpinner from "../../utils/LoadingSpinner.jsx";
import TweetMedia from "../HomeTweet/HomeTweetComponent/mainPage/mainPageComponent/TweetMedia.jsx";
import EmptytweetPage from "./TweetPageComponent/EmptyTweetPage.jsx";
import TweetLike from "./TweetPageComponent/TweetLike.jsx";
import TweetPageBtn from "./TweetPageComponent/TweetPageBtn.jsx";

const tweetDataPage = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const { userId } = useParams();

  // useState
  const [loading, setLoading] = useState(false);
  const [showVisibleIndex, setShowVisibleIndex] = useState([]);
  const [tweetData, setTweetData] = useState(null);

  //ref

  const ref = useRef([]);

  //effect

  useEffect(() => {
    const handletweetDataPage = async () => {
      try {
        setLoading(true);
        const result = await TweetPageApi(userId);
        setTweetData(result?.data?.data);
      } catch (err) {
        handleAxiosError(err, navigate);
      } finally {
        setLoading(false);
      }
    };
    handletweetDataPage();
  }, [userId]);

  useEffect(() => {
    const initial = {};
    if (tweetData?.length !== 0) {
      tweetData?.forEach((t) => (initial[t._id] = 0));
    }
    setShowVisibleIndex(initial);
  }, [tweetData]);

  //render loading
  if (loading) {
    return <LoadingSpinner label="Fetching Tweet" isData={true} />;
  }
  return (
    <>
      {tweetData?.length === 0 ? (
        <EmptytweetPage userId={userId} user={user?._id} />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-6 justify-center">
          {tweetData?.map((t) => {
            if (!ref.current[t._id]) {
              ref.current[t._id] = [];
            }
            return (
              <div key={t._id} className="">
                <div className=" bg-gradient-to-br from-slate-800 via-black to-slate-800 text-white rounded-xl   transform hover:scale-105 transition-all duration-300  p-5 shadow-md shadow-blue-200  hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 hover:shadow-blue-300 hover:shadow-lg">
                  {/* Media */}

                  <TweetMedia tweet={t} isTweet={true} />

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-white font-serif lg:text-lg  text-sm line-clamp-2 mb-2">
                      {t?.content}
                    </p>

                    {/* Like/Dislike */}
                    <TweetLike
                      tweetId={t._id}
                      initialLikeCount={t.tweetLikeCount}
                      initialDislikeCount={t.tweetDislikeCount}
                    />

                    {/* Actions */}
                    <TweetPageBtn
                      t={t}
                      setTweetData={setTweetData}
                      tweetData={tweetData}
                      userId={userId}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default tweetDataPage;
