// useAxiosErrorHandler.js
import { useNavigate } from "react-router-dom";

export function useAxiosErrorHandler() {
  const navigate = useNavigate();

  const handleAxiosError = (error) => {
    if (error.response) {
      console.error(
        "Server responded with",
        error.response.status,
        error.response.data,
      );

      // Handle JWT malformed or expired
      if (
        error.response.data?.message === "jwt malformed" ||
        error.response.data?.message === "jwt expired"
      ) {
        alert("Your session has expired");
        localStorage.removeItem("token");

        navigate("/login");
        navigate(0);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios setup error:", error.message);
    }
  };

  return handleAxiosError;
}
