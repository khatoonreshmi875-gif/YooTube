import { useEffect, useState } from "react";
import { getWatchHistory } from "../Api/UserApi";
import { useAxiosErrorHandler } from "../component/utils/erroeHandler";

export default function useHistory() {
  const [history, sethistory] = useState([]);
  const [channelOwnerId, setChannelOwnerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWatchHistory = async () => {
    setLoading(true);
    try {
      const result = await getWatchHistory();
      console.log(
        "sethstory",
        result.data.data.watchHistory.map((m) => {
          console.log(m);
          return m;
        }),
      );
      sethistory(
        result.data.data.watchHistory.filter((prev) => prev.videoId !== null),
      );
    } catch (err) {
      console.error("History fetch failed", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWatchHistory();
  }, []);
  return {
    history,
    fetchWatchHistory,
    sethistory,
    channelOwnerId,
    setChannelOwnerId,
    loading,
  };
}
