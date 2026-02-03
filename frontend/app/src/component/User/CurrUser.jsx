import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { SubscribeBtn, toggleSubcribeWithId } from "../../Api/Subscription.js";
import { getCurrentUserById } from "../../Api/UserApi.js";
import Navbar1 from "../Navigation/Navbar1.jsx";
import { AppContext } from "../utils/contextApi.js";
import { handleAxiosError } from "../utils/erroeHandler.jsx";
import LoadingSpinner from "../utils/LoadingSpinner.jsx";

const CurrUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const stateOfSubscribeButton = async () => {
    try {
      const res = await SubscribeBtn(userId);
      setSubscribe((prev) => ({
        ...prev,
        subscriber: res.data.data.isSubscribed,
      }));
    } catch (error) {
      handleAxiosError(error, navigate);
    }
  };
  const { onHandleVideoUserId, subscribe, setSubscribe } =
    useContext(AppContext);
  const [initial, setInitial] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setInitial({});
  }, [userId]);
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const result = await getCurrentUserById(userId);
        setInitial(result.data.data);

        setSubscribe(() => ({
          subscriberCount: result.data.data.subscriberCount,
          subscribedTo: result.data.data.subscribedToCount,
        }));
      } catch (err) {
        handleAxiosError(err, navigate);
      }
      await onHandleVideoUserId(userId);
      await stateOfSubscribeButton();
    };
    fetchChannelData();
  }, [userId]);

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
      }));P
    } catch (error) {
      handleAxiosError(error, navigate);
    } finally {
      setLoading(false);
    }
  };
  if (!initial) {
    return (
      <div className="mt-96">
        <LoadingSpinner label="Fetching like videos" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col min-h-screen  min-w-0 w-full pt-24     ">
        {/* Cover Image */}
        <div className="w-full  flex flex-col flex-1 relative">
          <img
            src={initial?.coverImage}
            alt="Cover"
            className="h-[15rem] w-full object-cover rounded-lg"
          />

          {/* Avatar + Channel Info */}
          <div
            className="flex items-start  space-x-2 bg-gradient-to-br from-slate-800 via-black to-slate-800 xs:m-4 m-1 rounded-lg p-4 hover:from-black hover:via-slate-800 hover:to-black shadow-sm shadow-blue-200 hover:shadow-blue-300 hover:shadow-md hover:scale-95  
"
          >
            <div className="lg:mt-[-1rem]  mb-[-9rem]  py-6 ">
              <img
                className=" md:w-[150px] w-24 aspect-square rounded-full  border-2  md:border-4 md:border-white shadow-lg hover:scale-105"
                src={initial?.avatar}
                alt="Avatar"
              />
            </div>
            <div className="lg:ml-6 md:ml-2  ml-1 md:space-y-3    space-y-1    px-3 ">
              <h1 className=" md:font-bold md:text-2xl text-lg sm:text-xl font-normal text-white font-serif ">
                {initial?.channelName}
              </h1>

              <div className="flex flex-wrap flex-col md:flex-row md:gap-3 sm:text-sm  text-sm text-gray-400 font-serif ">
                <p className="font-medium text-xs md:text-base sm:text-sm hover:text-white mt-3">
                  {initial?.username}
                </p>
                <div className="flex space-x-2 sm:space-x-6 flex-row ">
                  <div className="font-medium text-xs md:text-sm space-x-2 hover:text-white flex items-center  font-sans">
                    <span className="text-2xl  mt-[-0.6rem]">.</span>
                    {subscribe?.subscriberCount} Subscribers
                  </div>
                  <div className="font-medium text-xs md:text-sm  space-x-2 hover:text-white flex items-center  font-sans   ">
                    <span className="sm:text-2xl text-xl  mb-[1rem]">.</span>{" "}
                    <span>{subscribe?.subscribedTo} Subscribed</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-[12px] font-light md:text-base sm:text-sm max-w-xl line-clamp-2 italic ">
                {initial?.description}
              </p>

              <button
                className={`${subscribe?.subscriber ? "bg-red-600" : "bg-red-400"} hover:bg-red-600 text-gray-200  text-xs md:text-lg sm:text-sm font-semibold rounded-md md:px-4  px-2  py-1 transition active:scale-95 mt-2`}
                onClick={() => handleSubscribe(initial?._id)}
              >
                {subscribe?.subscriber ? "Subscribed" : "Subscribe"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-700 " />

          {/* Navbar */}
          <Navbar1 />

          {/* Outlet Content */}
          <div className="flex-2 md:px-6 px-2 py-4 w-full sm:px-5 min-h-screen">
            <Outlet />
          </div>

          <hr className="border-gray-700 my-6" />
        </div>
      </div>
    </>
  );
};

export default CurrUser;
