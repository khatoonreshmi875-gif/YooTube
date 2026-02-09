import React from "react";
import {
  Assign_Moderator,
  DeleteAccountById,
  RemoveModerator,
} from "../../../../Api/UserApi";
import { handleAxiosError } from "../../../utils/erroeHandler";

const UserComponentActionBtn = ({ user, setUserData, loggedInUser }) => {
  const handleDeleteAccount = async (userId) => {
    try {
      setUserData((prev) => prev.filter((p) => p._id !== userId));
      const res = await DeleteAccountById(userId);
      console.log("res of delete account by admin", res);
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
  return (
    <div>
      <div className="flex flex-col space-y-4">
        {loggedInUser === "admin" &&
          (user.role !== "moderator" ? (
            <button
              onClick={() =>
                handleAssignModerator({ email: user.email }, user._id)
              }
              className="ml-2 px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-300 to-blue-800 
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
              className="ml-2 px-3 py-1 text-sm font-semibold 
  bg-gradient-to-r from-purple-500 to-orange-700 
  text-white rounded-lg shadow 
  hover:from-orange-600 hover:to-orange-800 
  transform hover:scale-105 transition duration-200 ease-in-out"
            >
              ✖ Remove Moderator
            </button>
          ))}

        {user.role !== "admin" && (
          <button
            className=" ml-2 px-3 py-1 text-sm font-semibold  bg-gradient-to-tr from-red-500 via-red-900 to-red-500 
                 text-white rounded-lg shadow hover:from-red-700 hover:to-red-900 
                 transform hover:scale-105 transition duration-200 ease-in-out"
            onClick={() => handleDeleteAccount(user._id)}
          >
            <span className="text-white">🗑</span> Delete Account
          </button>
        )}
      </div>
    </div>
  );
};

export default UserComponentActionBtn;
