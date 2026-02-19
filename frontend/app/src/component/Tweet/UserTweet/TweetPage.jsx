import { useContext, useEffect, useRef, useState } from "react";
import { MdMessage } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { TweetPageApi } from "../../../Api/TweetApi.js";
import { AppContext } from "../../utils/contextApi.js";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import LoadingSpinner from "../../utils/LoadingSpinner.jsx";
import EmptySkeleton from "../../utils/EmptySkeleton.jsx";
import TweetMedia from "../HomeTweet/HomeTweetComponent/mainPage/mainPageComponent/TweetMedia.jsx";
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
        <div className="bg-white w-fit h-fit mx-auto border-slate-300 shadow-md rounded-lg p-3">
          {" "}
          <EmptySkeleton
            Icon={MdMessage}
            button_msg=" Create Tweet"
            msg="This channel hasn’t posted any tweets yet. Check back later or explore
          other content!"
            heading_text="   No tweets available"
            onClick={() => navigate("/create-tweet")}
            userId={userId}
          />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 p-6 justify-center">
          {tweetData?.map((t) => {
            if (!ref.current[t._id]) {
              ref.current[t._id] = [];
            }
            return (
              <div key={t._id}>
                <div className=" bg-white text-slate-700 rounded-xl h-auto   transform hover:scale-105 transition-all duration-300  p-5 shadow-md border-slate-300">
                  {/* Media */}

                  <TweetMedia tweet={t} isTweet={true} />

                  {/* Content */}
                  <div className="p-4 ">
                    <p className=" xs:text-sm text-[12px] line-clamp-2 mb-2  h-[4rem]">
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
