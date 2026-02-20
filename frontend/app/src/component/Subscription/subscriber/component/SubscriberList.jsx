import { useNavigate } from "react-router-dom";
import { priotizeSelectedChannel } from "../../subscription/sortFunction";
import useSubscribers from "./useSubscribers";

const SubscriberList = () => {
  const { stats, selectedChannelId } = useSubscribers();
  const navigate = useNavigate();

  return (
    <div className="my-5 flex flex-col space-y-6 w-full pb-24">
      {priotizeSelectedChannel(stats?.subscriber, selectedChannelId).map(
        (m, index) => (
          <div
            key={m._id}
            className="flex flex-col sm:flex-row items-center sm:justify-between 
                     sm:space-x-6 p-5 bg-white border border-slate-200 
                     rounded-2xl shadow-sm hover:shadow-md transition-transform 
                     hover:-translate-y-1"
          >
            {/* Avatar */}
            <img
              src={m?.userInfo?.avatar}
              alt=""
              className="w-16 h-16 rounded-full border-2 border-cyan-500 shadow-md mb-3 sm:mb-0 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => navigate(`/curr-user/${m.userInfo._id}/video`)}
            />

            {/* Channel Info */}
            <div className="flex flex-col text-center sm:text-left flex-1">
              <p className="text-slate-900 font-bold sm:text-lg text-sm">
                {m?.userInfo?.channelName}
              </p>
            
            </div>

            {/* Stats */}
            <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-end gap-2 mt-3 sm:mt-0">
              <span className="px-3 py-1 rounded-lg bg-cyan-100 text-cyan-700 font-medium sm:text-base text-xs">
                💬 {m.commentVideo} comments
              </span>
              <span className="px-3 py-1 rounded-lg bg-cyan-200 text-cyan-800 font-medium sm:text-base text-xs">
                🎥 {m.VideoLike} likes
              </span>
              <span className="px-3 py-1 rounded-lg bg-cyan-100/50 text-cyan-700 font-medium sm:text-base text-xs">
                🐦 {m.TweetLike} tweets
              </span>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default SubscriberList;
