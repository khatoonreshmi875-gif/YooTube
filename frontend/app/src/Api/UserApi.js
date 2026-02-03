import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/users";

export const registerUser = async (userdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userdata);

    console.log("response : ", response.data);
    return response;
  } catch (err) {
    console.log("Uploaded failed", err);
  }
};
export const loginUser = async (userdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userdata);
    console.log("login info", response.data);
    return response;
  } catch (err) {
    console.log("some problem", err);
    throw err;
  }
};
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (err) {
    console.log("logout failed ");
  }
};
export const changePassword = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${BASE_URL}/change-password`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("password", response);
    return response;
  } catch (err) {
    console.log("Password change failed", err);
  }
};
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/curr-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get current user info", response);
    return response;
  } catch (err) {
    console.log("user info  failed for user", err);
    throw err;
  }
};
export const getCurrentUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/curr-user-by-id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get current user info by user id", response);
    return response;
  } catch (err) {
    console.log("user info  failed for user id", err);
    throw err;
  }
};
export const UserById = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/user-id`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get current user  id", response);
    return response;
  } catch (err) {
    console.log("user info  failed for user id", err);
    throw err;
  }
};
export const getWatchHistory = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get watch history info", response);
    return response;
  } catch (err) {
    console.log(" watch history failed for user", err);
    throw err;
  }
};
export const getRemoveAVideoInWatchhistory = async (videoId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${BASE_URL}/delete-video-history/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("get watch history info", response);
    return response;
  } catch (err) {
    console.log(" watch history failed for user", err);
    throw err;
  }
};
export const clearAllWatchhistory = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/delete-all-history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("delete all video of watch history successfully", response);
    return response;
  } catch (err) {
    console.log(" watch history failed for user", err);
    throw err;
  }
};
export const forgetPassword = async (userdata) => {
  try {
    const response = await axios.post(`${BASE_URL}/forget-password`, userdata);
    console.log("forget password response", response);
    return response;
  } catch (err) {
    console.log(" forget pass failed for user", err);
    throw err;
  }
};
export const resetPassword = async (userdata, token) => {
  try {
    console.log("token", token, userdata);
    const response = await axios.post(
      `${BASE_URL}/reset-password?token=${token}`,
      userdata,
    );
    console.log("reset password successfully", response);
    return response;
  } catch (err) {
    console.log(" reset password failed for user", err);
    throw err;
  }
};
export const Assign_Moderator = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/assign-moderator`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("assign-moderator successfully", response);
    return response;
  } catch (err) {
    console.log(" assign-moderator failed", err);
    throw err;
  }
};
export const Report = async (userdata, userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:8000/api/v1/reports/report/${userId}`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("report successfully", response);
    return response;
  } catch (err) {
    console.log(" report failed", err);
    throw err;
  }
};
