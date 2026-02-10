import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/likes`;
export const toggleLike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/video/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("toggle like on video", response.data);
    return response;
  } catch (err) {
    console.log("toggle like failed", err);
    throw err;
  }
};

export const totalLike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/total-like/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("total like on video", response.data);
    return response;
  } catch (err) {
    console.log("total like fetch failed", err);
    throw err;
  }
};
export const totalLikeCommment = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/total-like-comment/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("total like on comment total cal ", response.data);
    return response;
  } catch (err) {
    console.log("total like commment fetch failed", err);
    throw err;
  }
};
export const stateOfCommentLike = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-comment-like/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("total like on comment like", response.data);
    return response;
  } catch (err) {
    console.log("total like commment fetch failed", err);
    throw err;
  }
};
export const stateOfVideoLike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-video-like/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("total like onvideo", response.data);
    return response;
  } catch (err) {
    console.log("total like video fetch failed", err);
    throw err;
  }
};
export const toggleLikeComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/comment-like/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("toggle like on Comment", response.data);
    return response;
  } catch (err) {
    console.log("toggle like  comment failed", err);
    throw err;
  }
};
export const toggleTweetLike = async (tweetId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/toggle-tweet/${tweetId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("toggle tweet like on Tweet", response.data);
    return response;
  } catch (err) {
    console.log("toggle tweet like failed ", err);
    throw err;
  }
};
export const GetLikedVideos = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/liked-videos`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("all liked videos", response.data);
    return response;
  } catch (err) {
    console.log("fetch liked videos failed", err);
    throw err;
  }
};
export const GetSortVideos = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/liked-videos`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: userdata,
      },
    );
    console.log("all liked videos sort", response.data);
    return response;
  } catch (err) {
    console.log("fetch liked videos sort failed", err);
    throw err;
  }
};
export const stateOfTweetLike = async (tweetId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-tweet-like/${tweetId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("state of like on tweet", response.data);
    return response;
  } catch (err) {
    console.log("total like on tweet failed", err);
    throw err;
  }
};
