import { useNavigate } from "react-router-dom";
import UserComponentActionBtn from "./UserComponentActionBtn";

const UserTable = ({ user, loggedInUser, setUserData }) => {
  const navigate = useNavigate();
  return (
    <>
      <td className="p-3" onClick={() => navigate(`/curr-user/${user._id}`)}>
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 aspect-square rounded-full border-2 border-white"
        />
      </td>
      <td className="p-3 font-semibold text-white">{user.channelName}</td>
      <td className="p-3 text-pink-300">{user.subscriberCount}</td>
      <td className="p-3 text-purple-300">{user.subscribedToCount}</td>
      <td className="p-3 text-cyan-300">{user.email}</td>
      <td className="p-3 text-green-300">{user.role || "user"}</td>
      <td className="p-3">
        {" "}
        <UserComponentActionBtn
          user={user}
          loggedInUser={loggedInUser}
          setUserData={setUserData}
        />
      </td>
    </>
  );
};

export default UserTable;
