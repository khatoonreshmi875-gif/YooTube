// apiClient.js
import axios from "axios";

export const createCancelableRequest = () => {
  const controller = new AbortController();
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    signal: controller.signal, // ✅ attach signal
  });

  return { client, controller };
};
