import { useNavigate } from "react-router-dom";
import { priotizeSelectedChannel } from "../../subscription/sortFunction";
import useSubscribers from "./useSubscribers";

const SubscriberList = () => {
  const { stats, selectedChannelId } = useSubscribers();
  const navigate = useNavigate();

  return (
    <div className="my-5 flex flex-col space-y-6  w-full pb-24">
      {priotizeSelectedChannel(stats?.subscriber, selectedChannelId).map(
        (m, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center sm:space-x-6 p-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/30 transition transform hover:-translate-y-1"
          >
            {/* Avatar */}
            <img
              src={m?.userInfo?.avatar}
              alt=""
              className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-md mb-4 sm:mb-0"
              onClick={() => navigate(`/curr-user/${m.userInfo._id}/video`)}
            />

            {/* Channel Info */}
            <div className="flex flex-col text-center sm:text-left">
              <p className="text-gray-900 font-bold text-lg">
                {m?.userInfo?.channelName}
              </p>
              <p className="text-sm text-gray-600">Rank #{index + 1}</p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap sm:flex-nowrap flex-1 justify-center sm:justify-end gap-2 sm:space-x-4 text-sm font-medium mt-4 sm:mt-0">
              <span className="px-3 py-1 rounded-lg bg-pink-200/60 text-pink-700">
                💬 {m.commentVideo} comments
              </span>
              <span className="px-3 py-1 rounded-lg bg-green-200/60 text-green-700">
                🎥 {m.VideoLike} likes
              </span>
              <span className="px-3 py-1 rounded-lg bg-yellow-200/60 text-yellow-700">
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
