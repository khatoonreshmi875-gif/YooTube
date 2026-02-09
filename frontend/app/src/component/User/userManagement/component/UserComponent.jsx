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
        <thead className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 font-serif">
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
                  ? "bg-gradient-to-tr from-black via-slate-900 to-black hover:from-cyan-700 hover:to-cyan-700"
                  : "bg-gradient-to-tr from-black via-cyan-950 to-black hover:from-cyan-700 hover:to-cyan-700"
              } transition font-serif text-center`}
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
            className="bg-gradient-to-tr from-black via-slate-900 to-black p-4 rounded-lg shadow text-white"
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
