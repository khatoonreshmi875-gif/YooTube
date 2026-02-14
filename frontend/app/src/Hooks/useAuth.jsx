import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser } from "../Api/UserApi";
import { totalSubcribeChannel } from "../Api/Subscription";

export const useAuth = () => {
  const [user, setuser] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [isLoggedin, setisLoggedin] = useState();
  const handleUserSubscribePage = async (userId) => {
    const res = await totalSubcribeChannel(userId);
    setSubscribers(res?.data?.data);
  };
  const onHandle = async () => {
    const result = await getCurrentUser();
    setuser(result.data.data);
    console.log("data of onhandle", result);
    handleUserSubscribePage(result.data.data._id);
  };
  useEffect(() => {
    onHandle();
  }, []);
  return {
    user,
    setuser,
    subscribers,
    setSubscribers,
    onHandle,
    isLoggedin,
    setisLoggedin,
  };
};
