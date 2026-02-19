import React, { useContext } from "react";
import UserComponentActionBtn from "./UserComponentActionBtn";
import { AppContext } from "../../../utils/contextApi";

const UserCard = ({ user, loggedInUser, setUserData }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-3">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-16 h-16 rounded-full border-2 border-slate-100"
        />
        <div>
          <h3 className="font-semibold text-slate-900">{user.channelName}</h3>
          <p className="text-slate-700 text-sm">
            Subscribers: {user.subscriberCount}
          </p>
          <p className="text-slate-700 text-sm">
            Subscriptions: {user.subscribedToCount}
          </p>
          <p className="text-slate-700 text-sm">Email: {user.email}</p>
          <p className="text-slate-700 text-sm">Role: {user.role || "user"}</p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {/* same action buttons */}
        <UserComponentActionBtn
          user={user}
          loggedInUser={loggedInUser}
          setUserData={setUserData}
        />
      </div>
    </div>
  );
};

export default UserCard;
