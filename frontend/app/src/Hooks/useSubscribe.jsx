import { useState } from "react";
import {
  toggleSubcribeWithId,
  totalSubcribeChannel,
} from "../Api/Subscription";

export const useSubscribe = () => {
  const [followers, setfollowers] = useState([]);
  const [subscribe, setSubscribe] = useState();
  const [stats, setStats] = useState(null);
  const handleSubscribePage = async (userId) => {
    const res = await totalSubcribeChannel(userId);

    setfollowers(res.data.data.subscriberOfEachChannel);
    console.log("subscription", res.data.data);
  };

  const toggleSubscribe = async (channelId) => {
    try {
      let res = await toggleSubcribeWithId(channelId);
      setSubscribe((prev) => ({
        ...prev,
        ...res.data.data,
        subscriberCount:
          res?.data?.data.subscribers?.subscriberCount ?? prev.subscriberCount,
        subscriber: res?.data?.data.subscribers?.subscriber ?? prev.subscriber,
      }));
      console.log("sub", subscribe);
    } catch (error) {
      console.log(error);
    }
  };
  return { followers, setfollowers, setSubscribe, subscribe, stats, setStats };
};
