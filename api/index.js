import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const TOKEN_KEY = "jwt_token";
const GUEST_KEY = "guest_id";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getGuestId = () => {
  let id = localStorage.getItem(GUEST_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(GUEST_KEY, id);
  }
  return id;
};

export const clearGuestId = () => localStorage.removeItem(GUEST_KEY);

api.interceptors.request.use((cfg) => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  else cfg.headers["X-Guest-Id"] = getGuestId();
  return cfg;
});
