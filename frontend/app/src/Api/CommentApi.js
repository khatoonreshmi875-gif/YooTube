import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/comments";
export const getAllCommentOfSpecificVideo = async (videoId, page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/com/${videoId}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of fetched video comment by it id: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment fetched bu videoid failed", err);
     throw err;
  }
};
export const getEditcomment = async (commentId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${BASE_URL}/comm/${commentId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //console.log("updated comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment updated failed", err);
     throw err;
  }
};
export const getCommentById = async (commentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/comment-id/${commentId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Comment by id fetched successfully: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment fetched failed", err);
     throw err;
  }
};
export const getReplycomment = async (commentId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/comm/${commentId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Reply comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment Replied failed", err);
     throw err;
  }
};
export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${BASE_URL}/comm/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of delete comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment delete failed", err);
     throw err;
  }
};
export const GetAllRepliedComment = async (commentId, page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/comm/${commentId}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of fetch all replied comment: ", response.data);
    return response;
  } catch (err) {
    console.log(" fetch all replied failed", err);
     throw err;
  }
};
export const getTweetCommentById = async (tweetId, page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/tweet-comment/${tweetId}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of fetch all replied comment: ", response.data);
    return response;
  } catch (err) {
    console.log(" fetch all replied failed", err);
     throw err;
  }
};
export const AddComment = async (videoId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/com/${videoId}`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of add comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment add failed", err);
     throw err;
  }
};
export const AddTweetComment = async (tweetId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/add-comment-tweet/${tweetId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of add comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment add failed", err);
     throw err;
  }
};
export const ReplyTweetComment = async (tweetId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${BASE_URL}/tweet-comment/${tweetId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response of add comment: ", response.data);
    return response;
  } catch (err) {
    console.log("Comment add failed", err);
     throw err;
  }
};
