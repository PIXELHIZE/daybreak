import { api, setToken, clearGuestId } from "./index.js";

export const register = async (data) => {
  const res = await api.post("/auth/register", data);
  setToken(res.data.token);
  clearGuestId();
  return res.data.token;
};

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  setToken(res.data.token);
  return res.data.token;
};

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const logout = () => setToken("");
