import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { EllipsisVerticalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SubscribeBtn, toggleSubcribeWithId } from "../../Api/Subscription.js";
import { getCurrentUserById } from "../../Api/UserApi.js";
import Navbar1 from "../Navigation/Navbar1.jsx";
import { AppContext } from "../utils/contextApi.js";
import { handleAxiosError, useAxiosErrorHandler } from "../utils/erroeHandler.jsx";
import LoadingSpinner from "../utils/LoadingSpinner.jsx";
import ChannelMenu from "./ChannelMenu.jsx";
import Button from "../Tweet/UserTweet/Button.jsx";

const CurrUser = () => {
  const { userId } = useParams();
    const handleAxiosError = useAxiosErrorHandler()
  
  const { onHandleVideoUserId, subscribe, setSubscribe, user } =
    useContext(AppContext);

  //usestate
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //initial page loaad
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userId]);

  //function-> initial state of subscrbe button

  const stateOfSubscribeButton = async () => {
    try {
      const res = await SubscribeBtn(userId);
      setSubscribe((prev) => ({
        ...prev,
        subscriber: res.data.data.isSubscribed,
      }));
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // fetch curr user info and user video and state of subscribe button

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const result = await getCurrentUserById(userId);
        setInitial(result.data.data);

        setSubscribe(() => ({
          subscriberCount: result?.data?.data?.subscriberCount,
          subscribedTo: result?.data?.data?.subscribedToCount,
        }));
      } catch (err) {
        handleAxiosError(err);
      }
      await onHandleVideoUserId(userId);
      await stateOfSubscribeButton();
    };
    fetchChannelData();
  }, [userId]);

  //toggle subscribe button

  const handleSubscribe = async (channelId) => {
    if (loading) return; // ignore extra clicks
    setLoading(true);
    setSubscribe((prev) => ({
      ...prev,
      subscriberCount: prev.subscriber
        ? (prev.subscriberCount ?? 0) - 1
        : (prev.subscriberCount ?? 0) + 1,
      subscriber: !prev.subscriber,
    }));
    try {
      let res = await toggleSubcribeWithId(channelId);

      setSubscribe((prev) => ({
        ...prev,
        subscriberCount:
          res?.data?.data.subscribers?.subscriberCount ?? prev.subscriberCount,
        subscriber: res?.data?.data.subscribers?.subscriber ?? prev.subscriber,
      }));
      P;
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setLoading(false);
    }
  };
  //empty page loading
  if (initial === null) {
    return <LoadingSpinner label="Loading Channel" />;
  }
  return (
    <>
      <div className="flex flex-col min-h-screen min-w-0 w-full">
        {/* Cover Image */}
        <div className="w-full flex flex-col flex-1 relative p-7">
          <img
            src={`${initial?.coverImage}.jpg`}
            alt="Cover"
            className="w-full aspect-auto object-cover rounded-lg border border-slate-200 shadow-sm"
          />

          {/* Avatar + Channel Info */}
          <div
            className="flex items-start sm:space-x-4  bg-white border border-slate-200 
                    rounded-lg p-6 shadow-sm hover:shadow-md transition mt-4 "
          >
            <div className="lg:mt-[-1rem] mt-[-2rem] py-6">
              <img
                className="md:w-[150px] w-24 aspect-square rounded-full border-2 md:border-4 
                     border-slate-200 shadow-md hover:scale-105 transition"
                src={initial?.avatar}
                alt="Avatar"
              />
            </div>

            <div className="lg:ml-6 md:ml-2 ml-1 space-y-2 sm:px-3 w-full">
              <div className="flex justify-between items-start">
                <h1 className="md:font-bold md:text-2xl text-sm sm:text-xl font-semibold text-slate-900">
                  {initial?.channelName}
                </h1>

                {/* 3-dot menu */}
                {userId === user._id && (
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() => setOpen(!open)}
                      className="p-2 rounded-full hover:bg-slate-100 transition duration-200"
                    >
                      {open === true ? (
                        <XMarkIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
                      ) : (
                        <EllipsisVerticalIcon className="aspect-square sm:w-5 w-4 text-slate-700" />
                      )}
                    </button>

                    <ChannelMenu open={open} />
                  </div>
                )}
              </div>
              {/* Channel Stats */}
              <div className="flex flex-wrap flex-col md:flex-row md:gap-3 sm:text-sm text-sm text-slate-600 sm:space-y-0 space-y-2 ">
                <div className="font-medium text-xs md:text-base sm:text-sm ">
                  {initial?.username}
                </div>
                <div className="flex space-x-6 flex-row">
                  <div className="font-medium text-xs md:text-sm flex items-center">
                    {subscribe?.subscriberCount} Subscribers
                  </div>
                  <div className="font-medium text-xs md:text-sm flex items-center">
                    {subscribe?.subscribedTo} Subscribed
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-500 text-xs md:text-base sm:text-sm max-w-xl line-clamp-2">
                {initial?.description}
              </p>

              {/* Subscribe Button */}
              <Button
                bg={
                  subscribe?.subscriber
                    ? "bg-red-100 text-red-700 hover:bg-red-700 hover:text-white "
                    : "bg-slate-200 text-slate-700 hover:bg-slate-400 hover:text-white"
                }
                onClick={() => handleSubscribe(initial?._id)}
                label={subscribe?.subscriber ? "Unsubscribe" : "Subscribe"}
              />
            </div>
          </div>
          {/* Divider */}
          <hr className="border-slate-200 my-6" />
          {/* Navbar */}
          <Navbar1 />
          {/* Outlet Content */}
          <div className="flex-2 md:px-6 px-2 py-4 w-full sm:px-5 min-h-0">
            <Outlet />
          </div>

          <hr className="border-slate-200 my-6" />
        </div>
      </div>
    </>
  );
};
export default CurrUser;
