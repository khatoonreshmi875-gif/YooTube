import axios from "axios";


const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/dislikes`;
export const toggleVideoDislike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/dislike-video/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("toggle like on video", response.data);
    return response;
  } catch (err) {
    console.log("toggle like failed", err);
     throw err;
  }
};
export const toggleTweetDislike = async (tweetId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/dislike-tweet/${tweetId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("toggle dislike on tweet", response.data);
    return response;
  } catch (err) {
    console.log("toggle dislike of tweet failed", err);
     throw err;
  
  }
};

export const totalVideoDislike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/total-dislike-comment/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("total like on video", response.data);
    return response;
  } catch (err) {
    console.log("total like fetch failed", err);
     throw err;
  }
};
export const totalDislikeCommment = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/total-dislike-comment//${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("total like on comment dislike", response.data);
    return response;
  } catch (err) {
    console.log("total like commment fetch failed", err);
     throw err;
  }
};
export const stateOfCommentDislike = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-comment-dislike/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("total like on comment like", response.data);
    return response;
  } catch (err) {
    console.log("total like commment fetch failed", err);
     throw err;
  }
};
export const stateOfVideoDislike = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-video-dislike/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("state of video dislike", response.data);
    return response;
  } catch (err) {
    console.log("tstate of video dislike  failed", err);
     throw err;
  }
};
export const toggleDislikeComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/comment-dislike/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("toggle like on Comment", response.data);
    return response;
  } catch (err) {
    console.log("toggle like  comment failed", err);
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
      }
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
      }
    );
    console.log("all liked videos sort", response.data);
    return response;
  } catch (err) {
    console.log("fetch liked videos sort failed", err);
     throw err;
  }
};
export const stateOfTweetDisike = async (tweetId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/state-tweet-dislike/${tweetId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("toggle like on tweet", response.data);
    return response;
  } catch (err) {
    console.log("toggle dislike on tweet failed", err);
     throw err;
   
  }
};
