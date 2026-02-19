import { useNavigate } from "react-router-dom";
import { searchChannel, totalSubcribe } from "../../../../Api/Subscription";
import { handleAxiosError } from "../../../utils/erroeHandler";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../utils/contextApi";

const useSubscribers = () => {
  const { stats, setStats } = useContext(AppContext);
  const [channel, setChannel] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const navigate = useNavigate();

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
        handleAxiosError(err, navigate);
      }
    };
    totalSubcribeChannel();
  }, []);
  const handleSearchChannel = async (userdata) => {
    try {
      const res = await searchChannel(userdata);
      setChannel(res.data.data.channel);
    } catch (err) {
      handleAxiosError(err, navigate);
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
