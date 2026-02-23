import { useContext, useEffect, useState } from "react";
import { MdSubscriptions } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { totalSubcribeChannel } from "../../../Api/Subscription.js";
import { AppContext } from "../../utils/contextApi.js";
import EmptySkeleton from "../../utils/EmptySkeleton.jsx";
import { useAxiosErrorHandler } from "../../utils/erroeHandler.jsx";
import SubscriptionBtn from "../subscription/componentSubscription/SubscriptionBtn.jsx";
import ChannelCard from "./componentSubscription/ChannelCard.jsx";
import EmptyvideoCard from "./componentSubscription/EmptyCard/EmptyvideoCard.jsx";
import SubscripptionVideo from "./componentSubscription/SubscripptionVideo.jsx";
import SubscriptionSearch from "./componentSubscription/SubscriptionSearch.jsx";
import { priotizeSelectChannel } from "./sortFunction.js";
const Subscription = () => {
  const { followers, user, FormatTime, setfollowers } = useContext(AppContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleAxiosError = useAxiosErrorHandler();

  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [userFolower, setUserFolower] = useState();
  const handleSubscribePage = async (userId) => {
    console.log("id", userId);
    try {
      const res = await totalSubcribeChannel(userId);
      setfollowers(res.data.data.subscriberOfEachChannel);
      console.log("subscription", res.data.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    handleSubscribePage(userId);
  }, [userId]);
  if (followers.length === 0) {
    // data fetched but no videos
    return (
      <div className="bg-white w-fit h-fit mx-auto border-slate-300 shadow-md rounded-lg p-3">
        <EmptySkeleton
          Icon={MdSubscriptions}
          button_msg=" Explore Channels"
          msg="You haven’t subscribed to any channels. Discover creators and
          subscribe to stay updated!"
          heading_text="   No subscriptions yet"
          onClick={() => navigate("/")}
          userId={userId}
        />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col space-y-6 bg-slate-50 min-h-screen p-4">
      {/* Search Bar */}
      <SubscriptionSearch setSelectedChannelId={setSelectedChannelId} />

      {/* Empty state */}

      <div className="space-y-6 w-full">
        {priotizeSelectChannel(followers, selectedChannelId).map((f,index) => (
          <div
            key={index+Date.now()}
            className="flex flex-col xl:flex-row xl:justify-between items-center 
                     space-y-4 xl:space-x-8 bg-white border border-slate-200 
                     rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] 
                     transition-transform duration-200 p-4"
          >
            {/* Channel Card */}
            <ChannelCard f={f} />

            {/* Recent Videos */}
            <div className="flex flex-col space-y-3 flex-1">
              <p className="text-center text-slate-900 font-semibold text-lg tracking-wide">
                Recent Videos
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                {f?.video.length !== 0 ? (
                  <>
                    {/* Small screens → show first 2 */}
                    <div className="flex flex-wrap sm:hidden gap-3">
                      {f?.video?.slice(0, 2).map((p, index) => (
                        <SubscripptionVideo f={f} p={p} key={p._id} />
                      ))}
                    </div>

                    {/* Medium and up → show all */}
                    <div className="hidden sm:flex      xl:grid xl:grid-cols-3 gap-3">
                      {f?.video?.map((p) => (
                        <SubscripptionVideo f={f} p={p} key={p._id} />
                      ))}
                    </div>
                  </>
                ) : (
                  <EmptyvideoCard />
                )}
              </div>
            </div>

            {/* Subscription Button */}
            <div className="flex justify-center lg:justify-end mt-4 lg:mt-0">
              <SubscriptionBtn
                f={f}
                userId={userId}
                userFolower={userFolower}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
