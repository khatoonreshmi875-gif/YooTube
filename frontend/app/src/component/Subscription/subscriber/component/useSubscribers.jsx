import { useContext, useEffect, useState } from "react";
import { searchChannel, totalSubcribe } from "../../../../Api/Subscription";
import { AppContext } from "../../../utils/contextApi";
import { useAxiosErrorHandler } from "../../../utils/erroeHandler";

const useSubscribers = () => {
  const { stats, setStats } = useContext(AppContext);
  const handleAxiosError = useAxiosErrorHandler();

  //usestate
  const [channel, setChannel] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");

  useEffect(() => {
    const totalSubcribeChannel = async () => {
      try {
        const res = await totalSubcribe();
        if (res.data.data.subscriber) {
          const validSubscriber = res.data.data.subscriber.filter(
            (m) => m.userInfo !== null,
          );
          setStats({
            ...res.data.data,
            subscriber: validSubscriber,
          });
        }
      } catch (err) {
        handleAxiosError(err);
      }
    };
    totalSubcribeChannel();
  }, []);
  const handleSearchChannel = async (userdata) => {
    try {
      const res = await searchChannel(userdata);
      setChannel(res.data.data.channel);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  return {
    channel,
    stats,
    handleSearchChannel,
    setSelectedChannelId,
    selectedChannelId,
  };
};

export default useSubscribers;
