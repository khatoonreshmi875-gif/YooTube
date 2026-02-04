import React, { useContext, useState } from "react";
import { toggleSubcribeWithId } from "../../../../Api/Subscription.js";
import { AppContext } from "../../../utils/contextApi.js";

const SubscriptionBtn = ({ f, userId, userFolower }) => {
  const { setfollowers, followers, user } = useContext(AppContext);
  const [follow, setFollow] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const handleSubscribe = async (channelId) => {
    console.log("it run", channelId);
    setFollow((prev) => !prev);
    const res = await toggleSubcribeWithId(channelId);
    console.log("res of sunbscription", res.data.data.subscriber);
    setFollow(res.data.data.subscriber);
  };
  const handleUnSubscribe = async (channelId) => {
    console.log("it run", channelId);
    setFollow((prev) => !prev);
    const res = await toggleSubcribeWithId(channelId);
    console.log("res of sunbscription", res.data);
    setFollow(res.data.data.subscriber);
  };
  console.log(
    "followers",
    followers,
    followers?.some((m) => m._id === f._id),
    console.log(follow),
  );
  const data = isToggle ? follow : userFolower?.some((m) => m._id === f._id);
  return (
    <>
      {" "}
      <div className="flex items-center">
        {userId === user._id ? (
          <button
            className="bg-cyan-700 px-3 py-1 rounded-md text-white text-sm lg:text-base font-serif hover:bg-cyan-600 transition"
            onClick={() => {
              setfollowers((prev) => prev.filter((p) => p._id !== f._id));
              handleUnSubscribe(f._id);
            }}
          >
            UnSubscribe
          </button>
        ) : data ? (
          <button
            className="bg-red-600 px-3 py-1 rounded-md text-white hover:bg-red-500 transition "
            onClick={() => {
              handleSubscribe(f._id);
              setIsToggle(true);
            }}
          >
            UnSubscribe
          </button>
        ) : (
          <button
            className="bg-green-600 px-3 text-sm py-1 rounded-md text-white hover:bg-green-500 transition"
            onClick={() => {
              handleSubscribe(f._id);
              setIsToggle(true);
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
