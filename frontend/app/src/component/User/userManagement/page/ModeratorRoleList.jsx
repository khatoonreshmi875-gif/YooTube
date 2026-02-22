import { useEffect, useState } from "react";
import { searchChannel } from "../../../../Api/Subscription";
import { getUserByModerator } from "../../../../Api/UserApi";
import UserListNavbar from "../../../Navigation/userListNavbar";
import SubscriptionSearch from "../../../Subscription/subscription/componentSubscription/SubscriptionSearch";
import { useAxiosErrorHandler } from "../../../utils/erroeHandler";
import UserComponent from "../component/UserComponent";

const ModeratorRoleList = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [channel, setchannel] = useState([]);
    const handleAxiosError = useAxiosErrorHandler();
  
  const handleSearchChannel = async (userdata) => {
    const res = await searchChannel(userdata);

    setchannel(res.data.data.channel);

    setUserData((p) => {
      const merged = [...channel, ...userData];
      const uniqueMap = new Map(merged.map((p) => [p._id, p]));
      return [...uniqueMap.values()];
    });
  };

  const FetchAllUser = async () => {
    try {
      const res = await getUserByModerator();
      setUserData(res.data.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    FetchAllUser();
    console.log("data", userData);
  }, []);
  return (
    <div>
      {" "}
      <div className="w-full ">
        <UserListNavbar />{" "}
        <SubscriptionSearch
          setSelectedChannelId={setSelectedChannelId}
          userData={userData}
          handleSearchChannel={handleSearchChannel}
          channel={channel}
        />
        <UserComponent
          selectedChannelId={selectedChannelId}
          setUserData={setUserData}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default ModeratorRoleList;
