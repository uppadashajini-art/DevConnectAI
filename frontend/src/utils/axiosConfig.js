
import axios from "axios";

// ===============================
// API BASE URL
// ===============================
// Local:
// VITE_API_URL=http://localhost:8080/api
//
// Production (Vercel):
// VITE_API_URL=https://devconnectai.onrender.com/api

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:8080/api";

// ===============================
// AXIOS INSTANCE
// ===============================
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
axiosInstance.interceptors.request.use(
  (config) => {
    // GET JWT TOKEN
    const token = localStorage.getItem("token");

    // ADD JWT TOKEN
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("================================");
console.log("REQUEST SENT");
console.log("Method:", config.method?.toUpperCase());
console.log("URL:", `${config.baseURL}${config.url}`);
console.log("TOKEN:", token);
console.log("AUTH HEADER:", config.headers?.Authorization);
console.log("================================");

    return config;
  },
  (error) => {
    console.log("REQUEST ERROR:");
    console.log(error);

    return Promise.reject(error);
  }
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("================================");
    console.log("RESPONSE RECEIVED");
    console.log("Status:", response.status);
    console.log("URL:", response.config?.url);
    console.log("================================");

    return response;
  },

  (error) => {
    console.log("================================");
    console.log("AXIOS ERROR");
    console.log(error);
    console.log("================================");

    // ===============================
    // NO RESPONSE / NETWORK ERROR
    // ===============================
    if (!error.response) {
      console.log("NETWORK ERROR");
      console.log("Backend may be unavailable.");

      return Promise.reject(error);
    }

    const status = error.response.status;

    // ===============================
    // 401 - UNAUTHORIZED
    // ===============================
    if (status === 401) {
      console.log("TOKEN EXPIRED OR INVALID");

      // CLEAR AUTH DATA
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      // REDIRECT TO LOGIN
      window.location.href = "/";
    }

    // ===============================
    // 403 - FORBIDDEN
    // ===============================
    if (status === 403) {
      console.log("ACCESS DENIED");
      alert("Access Denied");
    }

    // ===============================
    // 404 - NOT FOUND
    // ===============================
    if (status === 404) {
      console.log("API ENDPOINT NOT FOUND");
    }

    // ===============================
    // 405 - METHOD NOT ALLOWED
    // ===============================
    if (status === 405) {
      console.log("METHOD NOT ALLOWED");
      console.log(
        "Check the API URL and HTTP method."
      );
    }

    // ===============================
    // 500 - SERVER ERROR
    // ===============================
    if (status >= 500) {
      console.log("SERVER ERROR");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

