// src/api.js
import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api", // your backend URL
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from context
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle JWT expiry globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data.message === "jwt expired"
    ) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
