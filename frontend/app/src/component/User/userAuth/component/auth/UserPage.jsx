import React, { useEffect, useState } from "react";
import {
  AllUser,
  Assign_Moderator,
  RemoveModerator,
} from "../../../../../Api/UserApi";
import { handleAxiosError } from "../../../../utils/erroeHandler";
import { useNavigate } from "react-router-dom";
import SubscriptionSearch from "../../../../Subscription/subscription/componentSubscription/SubscriptionSearch";
import { priotizeSelectChannel } from "../../../../Subscription/subscription/sortFunction";
import { searchChannel } from "../../../../../Api/Subscription";

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [channel, setchannel] = useState([]);
  const navigate = useNavigate();
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
      const res = await AllUser();
      console.log("data of all user", res);
      setUserData(res.data.data);
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  const handleRemoveModerator = async (userdata, userId) => {
    try {
      setUserData((prev) =>
        prev.map((p) => {
          if (p._id === userId) {
            return { ...p, role: "user" };
          } else {
            return p;
          }
        }),
      );
      const res = await RemoveModerator(userdata);
      alert("✅ Moderator remove successfully");
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };
  const handleAssignModerator = async (userdata, userId) => {
    try {
      setUserData((prev) =>
        prev.map((p) => {
          if (p._id === userId) {
            return { ...p, role: "moderator" };
          } else {
            return p;
          }
        }),
      );
      const res = await Assign_Moderator(userdata);
      alert("✅ Moderator assigned successfully");
    } catch (err) {
      handleAxiosError(err, navigate);
      if ((err.response.data.success = false)) {
        alert("❌ Failed to assign moderator.");
      }
    }
  };
  useEffect(() => {
    FetchAllUser();
    console.log("data", userData);
  }, []);
  return (
    <div>
      {" "}
      <div className="w-full mt-24">
        <SubscriptionSearch
          setSelectedChannelId={setSelectedChannelId}
          userData={userData}
          handleSearchChannel={handleSearchChannel}
          channel={channel}
        />
        <table
          border="1"
          cellPadding="10"
          className="w-full text-white mt-10 border-collapse"
        >
          <thead className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 font-serif">
            <tr>
              <th className="py-3 text-center">Avatar</th>
              <th className="py-3 text-center">Channel Name</th>
              <th className="py-3 text-center">Subscribers</th>
              <th className="py-3 text-center">Subscriptions</th>
              <th className="py-3 text-center">Email</th>
              <th className="py-3 text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {priotizeSelectChannel(userData, selectedChannelId)?.map(
              (user, index) => (
                <tr
                  key={user.email}
                  className={`${
                    index % 2 === 0
                      ? "bg-gradient-to-tr from-black via-slate-800 to-black hover:bg-blue-700"
                      : "bg-gradient-to-tr from-black via-cyan-950 to-black hover:bg-green-700"
                  } transition font-serif text-center`}
                >
                  <td
                    className={`p-3 hover:scale-105 `}
                    onClick={() => navigate(`/curr-user/${user._id}`)}
                  >
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-20 aspect-square rounded-full border-2 border-white"
                    />
                  </td>
                  <td className="p-3 font-semibold text-white">
                    {user.channelName}
                  </td>
                  <td className="p-3 text-pink-300">{user.subscriberCount}</td>
                  <td className="p-3 text-purple-300">
                    {user.subscribedToCount}
                  </td>
                  <td className="p-3 text-cyan-300">{user.email}</td>
                  <td className="p-3 text-green-300 flex flex-col items-center pt-9 gap-2">
                    {user.role}
                    {user.role !== "moderator" ? (
                      <button
                        onClick={() =>
                          handleAssignModerator({ email: user.email }, user._id)
                        }
                        className="ml-2 px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-800 
                 text-white rounded-lg shadow hover:from-blue-700 hover:to-blue-900 
                 transform hover:scale-105 transition duration-200 ease-in-out"
                      >
                        ➕ Assign Moderator
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleRemoveModerator({ email: user.email }, user._id)
                        }
                        className="ml-2 px-3 py-1 text-sm font-semibold bg-gradient-to-r from-red-600 to-red-800 
                 text-white rounded-lg shadow hover:from-red-700 hover:to-red-900 
                 transform hover:scale-105 transition duration-200 ease-in-out"
                      >
                        ✖ Remove Moderator
                      </button>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
