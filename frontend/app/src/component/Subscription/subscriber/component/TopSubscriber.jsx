import { sortByEngagement } from "../../subscription/sortFunction";
import useSubscribers from "./useSubscribers";

const TopSubscriber = () => {
  const { stats } = useSubscribers();

  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow-md border border-slate-200 mt-6">
      {/* Title */}
      <p className="text-center font-bold text-sm sm:text-xl text-slate-900">
        🏆 Top Subscribers
      </p>

      {/* Subscriber List */}
      <div className="flex flex-col space-y-3 mt-4">
        {sortByEngagement(stats?.subscriber)
          .slice(0, 3)
          .map((m, index) => (
            <div
              key={m._id}
              className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm 
                       hover:shadow-md hover:bg-slate-50 transition-transform duration-200"
            >
              {/* Rank */}
              <p className="font-bold text-cyan-600 sm:text-base text-xs">
                {index + 1}.
              </p>

              {/* Channel Name */}
              <p className="text-slate-900 font-medium truncate sm:text-base text-xs">
                {m?.userInfo?.channelName}
              </p>

              {/* Engagement Total */}
              <p className="text-cyan-700 font-semibold sm:text-base text-xs">
                {m.VideoLike + m.TweetLike + m.commentVideo}
              </p>
            </div>
          ))}
      </div>
    </div>
  );

};

export default TopSubscriber;
