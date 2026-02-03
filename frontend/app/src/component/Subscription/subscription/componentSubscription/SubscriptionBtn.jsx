import React, { useContext } from "react";
import { toggleSubcribeWithId } from "../../../../Api/Subscription.js";
import { AppContext } from "../../../utils/contextApi.js";

const SubscriptionBtn = ({ f, userId }) => {
  const { setfollow, setSubscribers, setfollowers, subscribers, user } =
    useContext(AppContext);
  const handleSubscribe = async (channelId) => {
    const res = await toggleSubcribeWithId(channelId);
    console.log("res of sunbscription", res.data);
  };
  const handleUnSubscribe = async (channelId) => {
    setfollowers((prev) => prev.filter((m) => m._id !== channelId));
    const res = await toggleSubcribeWithId(channelId);
    console.log("res of sunbscription", res.data);
  };
  return (
    <>
      {" "}
      <div className="flex items-center">
        {userId === user._id ? (
          <button
            className="bg-cyan-700 px-3 py-1 rounded-md text-white text-sm lg:text-base font-serif hover:bg-cyan-600 transition"
            onClick={() => {
              setfollow(f._id);

              handleUnSubscribe(f._id);
            }}
          >
            UnSubscribe
          </button>
        ) : subscribers.subscriberOfEachChannel?.some(
            (m) => m._id === f._id,
          ) ? (
          <button
            className="bg-red-600 px-3 py-1 rounded-md text-white hover:bg-red-500 transition "
            onClick={() => {
              setfollow(f._id);
              setSubscribers((prev) => prev.filter((p) => p._id !== f._id));
              handleSubscribe(f._id);
            }}
          >
            UnSubscribe
          </button>
        ) : (
          <button
            className="bg-green-600 px-3 text-sm py-1 rounded-md text-white hover:bg-green-500 transition"
            onClick={() => {
              setfollow(f._id);
              setSubscribers((prev) => [...prev, f]);
              handleSubscribe(f._id);
            }}
          >
            Subscribe
          </button>
        )}
      </div>
    </>
  );
};

export default SubscriptionBtn;
