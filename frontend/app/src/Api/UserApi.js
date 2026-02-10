import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/users`;

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
      `${process.env.BACKEND_URL}/api/v1/reports/report/${userId}`,
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
export const getReport = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/v1/reports/report`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("report fetch successfully", response);
    return response;
  } catch (err) {
    console.log(" report fetch failed", err);
    throw err;
  }
};
export const getReportByDate = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/v1/reports/report-by-date`,
      userdata,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("report fetch by date successfully", response);
    return response;
  } catch (err) {
    console.log(" report fetch by date failed", err);
    throw err;
  }
};
export const AllUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/all-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("get all user fetched", response);
    return response;
  } catch (err) {
    console.log(" get all user failed", err);
    throw err;
  }
};
export const RemoveModerator = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/remove-moderator`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("remove moderator successfully", response);
    return response;
  } catch (err) {
    console.log(" remove modertor failed ", err);
    throw err;
  }
};
export const getUserByUserRole = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${BASE_URL}/role-user`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("User by user role successfully", response);
    return response;
  } catch (err) {
    console.log("user by user role fetch failed ", err);
    throw err;
  }
};
export const getUserByModerator = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/role-moderator`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user moderator successfully", response);
    return response;
  } catch (err) {
    console.log(" User modertor fetch failed ", err);
    throw err;
  }
};
export const getUpdateAccountDetails = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${BASE_URL}/update-account`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user updated successfully", response);
    return response;
  } catch (err) {
    console.log(" User updated failed ", err);
    throw err;
  }
};
export const getUpdateCoverImage = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      `${BASE_URL}/update-coverImage`,
      userdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("user updated cover image successfully ", response);
    return response;
  } catch (err) {
    console.log(" User updated cover image failed ", err);
    throw err;
  }
};
export const getUpdateAvatar = async (userdata) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${BASE_URL}/update-avatar`, userdata, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user updated avatar successfully", response);
    return response;
  } catch (err) {
    console.log(" User avatarr fetch failed ", err);
    throw err;
  }
};
export const DeleteAccount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/delete-account`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user delete account successfully", response);
    return response;
  } catch (err) {
    console.log(" User delete failed ", err);
    throw err;
  }
};
export const DeleteAccountById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/delete-account/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("user delete account successfully", response);
    return response;
  } catch (err) {
    console.log(" User delete failed ", err);
    throw err;
  }
};
