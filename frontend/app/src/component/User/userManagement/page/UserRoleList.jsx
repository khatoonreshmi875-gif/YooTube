import { useEffect, useState } from "react";
import { searchChannel } from "../../../../Api/Subscription";
import { getUserByUserRole } from "../../../../Api/UserApi";
import UserListNavbar from "../../../Navigation/userListNavbar";
import SubscriptionSearch from "../../../Subscription/subscription/componentSubscription/SubscriptionSearch";
import { useAxiosErrorHandler } from "../../../utils/erroeHandler";
import UserComponent from "../component/UserComponent";

const UserRoleList = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [channel, setchannel] = useState([]);
    const handleAxiosError = useAxiosErrorHandler();
  
  const handleSearchChannel = async (userdata) => {
    console.log("userdata", userdata);
    const res = await searchChannel(userdata);
    console.log("channel", res.data.data.channel);
    setchannel(res.data.data.channel);

    setUserData((p) => {
      const merged = [...channel, ...userData];
      const uniqueMap = new Map(merged.map((p) => [p._id, p]));
      return [...uniqueMap.values()];
    });
  };

  const FetchAllUser = async () => {
    try {
      const res = await getUserByUserRole();
      setUserData(res.data.data);
    } catch (err) {
      handleAxiosError(err);
    }
  };

  useEffect(() => {
    FetchAllUser();
  }, []);
  return (
    <div>
      <div>
        {" "}
        <div className="w-full ">
          <UserListNavbar />

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
    </div>
  );
};

export default UserRoleList;
