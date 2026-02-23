import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/subscriptions`;
export const toggleSubcribeWithId = async (channelId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/toggle-btn/${channelId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("subscription on video", response.data);
    return response;
  } catch (err) {
    console.log("subscription failed ", err);
     throw err;
  }
};
export const toggleSubcribe = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/toggle-btn`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("subscription on video without id", response.data);
    return response;
  } catch (err) {
    console.log("subscription without id failed ", err);
     throw err;
  }
};
export const totalSubcribe = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/c/get-subscriber`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("total subscriber on channel", response.data);
    return response;
  } catch (err) {
    console.log("fetch total  subscriber failed", err);
     throw err;
  }
};
export const totalSubcribeChannel = async (channelId) => {
  console.log("userId",channelId)
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/get-all-subscriber/${channelId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("total subscriber of other channel", response.data);
    return response;
  } catch (err) {
    console.log("fetch total other subscriber failed", err);
     throw err;
  }
};
export const searchChannel = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log("userdata of api ", userdata);
    const response = await axios.post(`${BASE_URL}/search-channel`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("search channel response suvcessfully from api", response.data);
    return response;
  } catch (err) {
    console.log("search channel failed", err);
     throw err;
  }
};
export const SubscribeBtn = async (channelId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/subscribe-btn/${channelId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(" subscription response", response.data);
    return response;
  } catch (err) {
    console.log(" subscription responsefailed", err);
     throw err;
  }
};
export const subscriberstats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/stats`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(" subscription stats response", response.data);
    return response;
  } catch (err) {
    console.log(" subscription  stats responsefailed", err);
     throw err;
  }
};
export const subscriberPreviousStats = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/pre-stats`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(" subscription previous stats response", response.data);
    return response;
  } catch (err) {
    console.log(" subscription previous stats responsefailed", err);
     throw err;
  }
};
