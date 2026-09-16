
import axios from "axios";

// ========================================
// API BASE URL
// ========================================
//
// Vite environment variable:
// VITE_API_URL=https://devconnectai.onrender.com/api
//
// If VITE_API_URL is not available,
// production URL will be used.
//

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://devconnectai.onrender.com/api";

// ========================================
// AXIOS INSTANCE
// ========================================

const axiosInstance = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

axiosInstance.interceptors.request.use(
  (config) => {
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");

    // Add JWT token to request
    if (token) {
      config.headers = config.headers || {};

      config.headers.Authorization = `Bearer ${token}`;
    }

    // Safe debugging
    // IMPORTANT:
    // Do NOT print the JWT token itself.
    console.log("================================");
    console.log("REQUEST SENT");
    console.log(
      "Method:",
      config.method?.toUpperCase()
    );
    console.log(
      "URL:",
      `${config.baseURL}${config.url}`
    );
    console.log(
      "Authorization:",
      token ? "Bearer token attached" : "No token"
    );
    console.log("================================");

    return config;
  },

  (error) => {
    console.error("REQUEST ERROR:", error);

    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("================================");
    console.log("RESPONSE RECEIVED");
    console.log("Status:", response.status);
    console.log(
      "URL:",
      `${response.config?.baseURL || ""}${response.config?.url || ""}`
    );
    console.log("================================");

    return response;
  },

  (error) => {
    console.log("================================");
    console.log("AXIOS ERROR");
    console.log("Status:", error.response?.status);
    console.log(
      "URL:",
      `${error.config?.baseURL || ""}${error.config?.url || ""}`
    );
    console.log("================================");

    // ========================================
    // NO RESPONSE / NETWORK ERROR
    // ========================================

    if (!error.response) {
      console.log("NETWORK ERROR");
      console.log("Backend may be unavailable.");

      return Promise.reject(error);
    }

    const status = error.response.status;

    // ========================================
    // 401 - UNAUTHORIZED
    // ========================================

    if (status === 401) {
      console.log("TOKEN EXPIRED OR INVALID");

      // Remove authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      // Redirect to login
      window.location.href = "/";

      return Promise.reject(error);
    }

    // ========================================
    // 403 - FORBIDDEN
    // ========================================

    if (status === 403) {
      console.log("ACCESS DENIED");

      // Don't automatically logout.
      // 403 means the server understood the request
      // but the current user is not allowed to perform it.

      return Promise.reject(error);
    }

    // ========================================
    // 404 - NOT FOUND
    // ========================================

    if (status === 404) {
      console.log("API ENDPOINT NOT FOUND");
    }

    // ========================================
    // 405 - METHOD NOT ALLOWED
    // ========================================

    if (status === 405) {
      console.log("METHOD NOT ALLOWED");
      console.log("Check the API URL and HTTP method.");
    }

    // ========================================
    // 500+ - SERVER ERROR
    // ========================================

    if (status >= 500) {
      console.log("SERVER ERROR");
      console.log("Backend returned a server error.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
