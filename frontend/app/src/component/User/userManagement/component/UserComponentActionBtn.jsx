import React from "react";
import {
  Assign_Moderator,
  DeleteAccountById,
  RemoveModerator,
} from "../../../../Api/UserApi";
import { handleAxiosError } from "../../../utils/erroeHandler";
import Button from "../../../Tweet/UserTweet/Button";

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
            <Button
              onClick={() =>
                handleAssignModerator({ email: user.email }, user._id)
              }
              label="  ➕ Assign Moderator"
              bg="bg-blue-100 text-blue-600 hover:bg-blue-600"
            />
          ) : (
            <Button
              onClick={() =>
                handleRemoveModerator({ email: user.email }, user._id)
              }
              label=" ✖ Remove Moderator"
              bg="bg-red-100 text-red-600 hover:bg-red-600"
            />
          ))}

        {user.role !== "admin" && (
          <Button
            onClick={() => handleDeleteAccount(user._id)}
            label="Delete Account"
            bg="bg-red-100 text-red-600 hover:bg-red-600"
          />
        )}
      </div>
    </div>
  );
};

export default UserComponentActionBtn;
