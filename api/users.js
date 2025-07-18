import { api } from "./index.js";

export const getMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};
export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
