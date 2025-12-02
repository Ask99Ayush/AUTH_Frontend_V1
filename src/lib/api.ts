import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" }
});

// add auth header dynamically via interceptor
api.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("tf_token");
      if (t && config.headers) config.headers.Authorization = `Bearer ${t}`;
    }
  } catch (e) {}
  return config;
});

export default api;
