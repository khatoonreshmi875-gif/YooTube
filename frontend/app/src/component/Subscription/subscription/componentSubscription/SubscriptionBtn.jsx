import React, { useContext, useState } from "react";
import { toggleSubcribeWithId } from "../../../../Api/Subscription.js";
import { AppContext } from "../../../utils/contextApi.js";
import Button from "../../../Tweet/UserTweet/Button.jsx";

const SubscriptionBtn = ({ f, userId, userFolower }) => {
  const {
    setfollowers,
    followers,
    user,
    subscribe,
    setSubscribe,
    stateOfSubscribeButton,
  } = useContext(AppContext);
  const [follow, setFollow] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const handleSubscribe = async (channelId) => {
    console.log("it run", channelId);
    setFollow((prev) => !prev);
    const res = await toggleSubcribeWithId(channelId);
    setFollow(res.data.data.subscriber);
  };
  const handleUnSubscribe = async (channelId) => {
    console.log("it run", channelId);
    setFollow((prev) => !prev);
    const res = await toggleSubcribeWithId(channelId);
    console.log("res of sunbscription", res.data);
    setFollow(res.data.data.subscriber);
    if (f._id === user._id) {
      stateOfSubscribeButton(f._id);
    }
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

                setSubscribe((prev) => {
                  if (user._id === f._id) {
                    return {
                      ...prev,
                      subscribedTo: prev.subscribedTo - 1,
                      subscriber: false,
                    };
                  }
                  return {
                    ...prev,
                    subscribedTo: prev.subscribedTo - 1,
                  };
                });

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
