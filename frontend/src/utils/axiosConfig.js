import axios from "axios";

// ===============================
// AXIOS INSTANCE
// ===============================
const axiosInstance = axios.create({

  baseURL:
    "http://localhost:8080",

  headers: {

    "Content-Type":
      "application/json",

  },

});

// ===============================
// REQUEST INTERCEPTOR
// ===============================
axiosInstance.interceptors.request.use(

  (config) => {

    // GET TOKEN
    const token =
      localStorage.getItem(
        "token"
      );

    // ADD TOKEN
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    // DEBUG
    console.log(
      "REQUEST SENT:"
    );

    console.log(config);

    return config;
  },

  (error) => {

    console.log(
      "REQUEST ERROR:"
    );

    console.log(error);

    return Promise.reject(error);
  }
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
axiosInstance.interceptors.response.use(

  (response) => {

    console.log(
      "RESPONSE RECEIVED:"
    );

    console.log(response);

    return response;
  },

  (error) => {

    console.log(
      "AXIOS ERROR:"
    );

    console.log(error);

    // ===============================
    // TOKEN EXPIRED / INVALID
    // ===============================
    if (

      error.response &&

      error.response.status === 401

    ) {

      console.log(
        "TOKEN EXPIRED"
      );

      // CLEAR STORAGE
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "name"
      );

      localStorage.removeItem(
        "email"
      );

      localStorage.removeItem(
        "role"
      );

      // REDIRECT LOGIN
      window.location.href = "/";
    }

    // ===============================
    // FORBIDDEN
    // ===============================
    if (

      error.response &&

      error.response.status === 403

    ) {

      alert(
        "Access Denied"
      );
    }

    // ===============================
    // SERVER ERROR
    // ===============================
    if (

      error.response &&

      error.response.status === 500

    ) {

      console.log(
        "SERVER ERROR"
      );
    }

    // ===============================
    // NETWORK ERROR
    // ===============================
    if (

      error.message ===
      "Network Error"

    ) {

      alert(
        "Backend Server Not Running"
      );
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;