import React, { useContext, useState } from "react";
import { toggleSubcribeWithId } from "../../../../Api/Subscription.js";
import { AppContext } from "../../../utils/contextApi.js";
import Button from "../../../Tweet/UserTweet/Button.jsx";

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
  
  const data = isToggle ? follow : userFolower?.some((m) => m._id === f._id);
  return (
    <>
      {" "}
      <>
        <div className="flex items-center">
          {userId === user._id ? (
            <Button
              onClick={() => {
                setfollowers((prev) => prev.filter((p) => p._id !== f._id));
                handleUnSubscribe(f._id);
              }}
              label=" Unsubscribe"
              bg="bg-red-100 text-red-600 hover:bg-red-600"
            />
          ) : data ? (
            <Button
              onClick={() => {
                handleSubscribe(f._id);
                setIsToggle(true);
              }}
              label=" Unsubscribe"
              bg="bg-red-100 text-red-600 hover:bg-red-600"
            />
          ) : (
            <Button
              onClick={() => {
                handleSubscribe(f._id);
                setIsToggle(true);
              }}
              label=" Subscribe"
              bg="bg-slate-200 text-slate-700 hover:bg-slate-400"
            />
          )}
        </div>
      </>
    </>
  );
};

export default SubscriptionBtn;
