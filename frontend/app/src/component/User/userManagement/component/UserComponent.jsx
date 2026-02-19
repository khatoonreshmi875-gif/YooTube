import { useContext } from "react";
import { priotizeSelectChannel } from "../../../Subscription/subscription/sortFunction";

import UserCard from "./UserCard";
import UserTable from "./UserTable";
import { AppContext } from "../../../utils/contextApi";

const UserComponent = ({ setUserData, userData, selectedChannelId }) => {
  const { user } = useContext(AppContext);
  let loggedInUser = user.role;
  const prioritizedUsers = priotizeSelectChannel(userData, selectedChannelId);
  return (
    <div>
      {/* Table view for large screens */}
      <table
        border="1"
        cellPadding="10"
        className="hidden lg:table w-full text-white border-collapse"
      >
        <thead className="bg-blue-100 text-slate-900 font-medium">
          <tr>
            <th className="py-3 text-center">Avatar</th>
            <th className="py-3 text-center">Channel Name</th>
            <th className="py-3 text-center">Subscribers</th>
            <th className="py-3 text-center">Subscriptions</th>
            <th className="py-3 text-center">Email</th>
            <th className="py-3 text-center">Role</th>
            <th className="py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prioritizedUsers?.map((user, index) => (
            <tr
              key={user.email}
              className={`${
                index % 2 === 0
                  ? "bg-white hover:bg-slate-100"
                  : "bg-slate-50 hover:bg-slate-100"
              } transition  text-center`}
            >
              <UserTable
                setUserData={setUserData}
                user={user}
                loggedInUser={loggedInUser}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Card view for small/medium screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {prioritizedUsers?.map((user) => (
          <div
            key={user.email}
            className="bg-white border border-slate-200 p-4 rounded-lg shadow text-slate-700 hover:bg-slate-50 transition"
          >
            <UserCard
              setUserData={setUserData}
              user={user}
              loggedInUser={loggedInUser}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserComponent;
