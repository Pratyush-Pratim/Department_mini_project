import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3080";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export default API_BASE_URL;
