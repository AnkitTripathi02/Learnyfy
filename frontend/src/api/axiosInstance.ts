import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

axiosInstance.interceptors.request.use(
  (config) => {
    // Prefer access_token, fallback to token
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Authentication failed
    if (error.response?.status === 401) {
      console.warn(
        "Authentication expired or invalid."
      );

      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;