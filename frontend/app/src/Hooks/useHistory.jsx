import { useState } from "react";
import { getWatchHistory } from "../Api/UserApi";

export default function useHistory() {
  const [history, sethistory] = useState([]);
  const [channelOwnerId, setChannelOwnerId] = useState(null);
  const fetchWatchHistory = async () => {
    try {
      const lastId =
        history.length !== 0 ? history[history.length - 1]._id : [];
      const result = await getWatchHistory(lastId);
      console.log(result, "result of hhistory");
      sethistory(
        result.data.data.watchHistory.filter((prev) => prev.videoId !== null),
      );
    } catch (err) {
      console.error("History fetch failed", err);
    }
  };

  return {
    history,
    fetchWatchHistory,
    sethistory,
    channelOwnerId,
    setChannelOwnerId,
  };
}
