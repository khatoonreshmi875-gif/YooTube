import { sortByEngagement } from "../../subscription/sortFunction";
import useSubscribers from "./useSubscribers";

const TopSubscriber = () => {
  const { stats } = useSubscribers();

  return (
    <>
      {" "}
      <div className="bg-yellow-100 rounded-xl p-6 shadow-md border border-yellow-200 mt-6">
        <p className="text-center font-semibold text-lg sm:text-xl text-yellow-800">
          🏆 Top Subscribers
        </p>
        <div className="flex flex-col space-y-3 mt-4">
          {sortByEngagement(stats?.subscriber)
            .slice(0, 3)
            .map((m, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:bg-yellow-50 transition"
              >
                <p className="font-bold text-yellow-700">{index + 1}.</p>
                <p className="">{m?.userInfo?.channelName}</p>
                <p className="text-yellow-600 font-semibold">
                  {m.VideoLike + m.TweetLike + m.commentVideo}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TopSubscriber;
