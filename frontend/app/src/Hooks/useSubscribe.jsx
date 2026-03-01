import { useContext, useState } from "react";
import {
  SubscribeBtn,
  toggleSubcribeWithId,
  totalSubcribeChannel,
} from "../Api/Subscription";
import { AppContext } from "../component/utils/contextApi";

export const useSubscribe = () => {
  const [followers, setfollowers] = useState(null);
  const [subscribe, setSubscribe] = useState();
  const [stats, setStats] = useState(null);
  const handleSubscribePage = async (userId) => {
    const res = await totalSubcribeChannel(userId);

    setfollowers(res.data.data.subscriberOfEachChannel);
    console.log("subscription", res.data.data);
  };
  const stateOfSubscribeButton = async (userId) => {
    try {
      const res = await SubscribeBtn(userId);
      setSubscribe((prev) => ({
        ...prev,
        subscriber: res.data.data.isSubscribed,
      }));
    } catch (error) {
      console.error(" state of subscriber fetch failed");
    }
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
  return {
    followers,
    setfollowers,
    setSubscribe,
    subscribe,
    stats,
    setStats,
    handleSubscribePage,
    stateOfSubscribeButton,
  };
};
