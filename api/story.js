import { api } from "./index.js";

export const createStory = async (content) => {
  const res = await api.post("/stories", { content });
  return res.data;
};

export const listStories = async () => {
  const res = await api.get("/stories");
  return res.data;
};

export const randomStory = async () => {
  const res = await api.get("/stories/random");
  return res.data;
};

export const readStory = async (id) => {
  const res = await api.post(`/stories/${id}/read`);
  return res.data;
};

export const myStories = async () => {
  const res = await api.get("/stories/my-stories");
  return res.data;
};

export const getStory = async (id) => {
  const res = await api.get(`/stories/${id}`);
  return res.data;
};

export const likeStory = async (id) => {
  const res = await api.post(`/stories/${id}/like`);
  return res.data;
};

export const storyLikes = async (id) => {
  const res = await api.get(`/stories/${id}/likes`);
  return res.data;
};
