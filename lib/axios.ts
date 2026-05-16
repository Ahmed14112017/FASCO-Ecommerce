import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
