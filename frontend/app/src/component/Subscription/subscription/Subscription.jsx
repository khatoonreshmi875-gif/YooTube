import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { totalSubcribeChannel } from "../../../Api/Subscription.js";
import { AppContext } from "../../utils/contextApi.js";
import { handleAxiosError } from "../../utils/erroeHandler.jsx";
import { priotizeSelectChannel } from "./sortFunction.js";
import SubscriptionBtn from "../subscription/componentSubscription/SubscriptionBtn.jsx";
import EmptySubscription from "./componentSubscription/EmptySubscription.jsx";
import SubscriptionSearch from "./componentSubscription/SubscriptionSearch.jsx";
import SubscripptionVideo from "./componentSubscription/subscripptionvideo.jsx";
import ChannelCard from "./componentSubscription/ChannelCard.jsx";
import EmptyvideoCard from "./componentSubscription/EmptyvideoCard.jsx";
const Subscription = () => {
  const { followers, user, FormatTime, setfollowers } = useContext(AppContext);
  const { userId } = useParams();
  const [selectedChannelId, setSelectedChannelId] = useState("");

  const handleSubscribePage = async (userId) => {
    try {
      const res = await totalSubcribeChannel(userId);
      setfollowers(res.data.data.subscriberOfEachChannel);
      console.log("subscription", res.data.data);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  useEffect(() => {
    handleSubscribePage(userId);
  }, []);

  return (
    <div className="w-full flex flex-col  ">
      <SubscriptionSearch setSelectedChannelId={setSelectedChannelId} />

      {Array.from(followers) && followers?.length === 0 ? (
        <EmptySubscription userId={userId} user={user._id} />
      ) : (
        <div className="space-y-3 px-1 py-1 sm:space-y-6 sm:px-6 sm:py-4 bg-gradient-to-bl  from-slate-900 to-cyan-900 rounded-xl w-full   ">
          {priotizeSelectChannel(followers, selectedChannelId).map((f) => (
            <div
              className="flex flex-col xl:flex-row xl:justify-between items-center space-y-3 xl:space-x-12 xl:h-52 bg-gradient-to-bl from-slate-800 via-black to-slate-800 rounded-lg shadow-md shadow-blue-200   hover:from-cyan-950 hover:via-slate-950 hover:to-cyan-950 hover:shadow-blue-300 hover:shadow-lg  hover:scale-[1.02] transition-transform duration-200 md:p-2 "
              key={f._id}
            >
              <ChannelCard f={f} />
              <div className="space-y-3 flex flex-col ">
                <p className="text-center text-gray-200 font-semibold text-lg tracking-wide font-serif">
                  Recent Videos
                </p>
                <div className=" flex flex-wrap justify-center ">
                  {f.video.length !== 0 ? (
                    <>
                      {/* Small screens → show only first 2 */}
                      <div className="flex flex-wrap  sm:hidden ">
                        {f.video.slice(0, 2).map((p) => (
                          <SubscripptionVideo f={f} p={p} />
                        ))}
                      </div>

                      {/* Medium and up → show all */}
                      <div className="hidden sm:flex sm:flex-wrap sm:justify-center xl:grid xl:grid-cols-3">
                        {f.video.map((p) => (
                          <SubscripptionVideo f={f} p={p} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <EmptyvideoCard />
                  )}
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end p-4 sm:py-4">
                <SubscriptionBtn f={f} userId={userId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscription;
