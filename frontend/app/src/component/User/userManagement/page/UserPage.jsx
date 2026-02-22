import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchChannel } from "../../../../Api/Subscription";
import { AllUser } from "../../../../Api/UserApi";
import UserListNavbar from "../../../Navigation/userListNavbar";
import SubscriptionSearch from "../../../Subscription/subscription/componentSubscription/SubscriptionSearch";
import { handleAxiosError } from "../../../utils/erroeHandler";

import LoadingSpinner from "../../../utils/LoadingSpinner";
import UserComponent from "../component/UserComponent";

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  // Search channel and merge results into userData
  const handleSearchChannel = async (userdata) => {
    const res = await searchChannel(userdata);
    setChannel(res.data.data.channel);

    setUserData((p) => {
      const merged = [...channel, ...userData];
      const uniqueMap = new Map(merged.map((p) => [p._id, p]));
      return [...uniqueMap.values()];
    });
  };

  // Fetch all users
  const fetchAllUser = async () => {
    setLoading(true);
    try {
      const res = await AllUser();
      setUserData(res.data.data);
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <LoadingSpinner label="Fetching Reports" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <UserListNavbar />
      <div>
        {" "}
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

export default UserPage;
