import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/videos";
export const upload_Video = async (userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${BASE_URL}/upload-video`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response : ", response.data);
    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const getVideo = async (page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/upload-video?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response of video : ", response.data);
    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};

export const RecommendedVideo = async (page) => {
  const token = localStorage.getItem("token");
  try {
    console.log("token od  rec video", token);

    const response = await axios.get(
      `${BASE_URL}/get-reccomended-video?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("video recommeded fetched successfully : ", response.data);

    return response;
  } catch (error) {
    console.log("token od  rec video", token);
    console.log("error of reccomended video", error);
    throw error;
  }
};
export const getVideoByUserId = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/user/get-all-videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("video retrieved successfully : ", response.data);

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const getVideoUserId = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/user/get-all-videos/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response : ", response.data);

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const getSimilarVideo = async (videoId, page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/rec-video/${videoId}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response of similar video ⚡: ", response.data);

    return response;
    3;
  } catch (err) {
    console.log("Uploaded  of Similar video", err);
    throw err;
  }
};
export const getSimilarChannelVideo = async (userId, page) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/user-id/${userId}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response : ", response.data.data);

    return response;
  } catch (err) {
    console.log("Uploaded  of Similar channel video", err);
    throw err;
  }
};
export const deleteVideo = async (videoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${BASE_URL}/delete/${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response : ", response.data);

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const EditVideo = async (videoId, userdata) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${BASE_URL}/delete/${videoId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response : ", response.data);

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const getVideoByVideoId = async (videoId, userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/id/${videoId}/user/${userId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response : ", response.data);

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};
export const downloadVideo = async (videoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/download/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("download video successfull");

    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
    throw err;
  }
};

export const getViews = async (videoId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${BASE_URL}/views/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("response of view : ", response.data);

    return response;
  } catch (err) {
    console.log(" view failed", err);
    throw err;
  }
};
export const onlyVideo = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const start = Date.now();
    const response = await axios.get(
      `${BASE_URL}/vid/${videoId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  } catch (err) {
    console.log(" video failed", err);
    throw err;
  }
};
