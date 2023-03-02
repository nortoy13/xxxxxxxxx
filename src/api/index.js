import axios from "axios";
const API = axios.create({ baseURL: "https://nodirbekserver.herokuapp.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});

export const fetchPost = (id) => API.get(`posts/${id}`);
export const fetchPosts = () => API.get("/posts");
export const fetchPostsBySearch = (searchQuery) =>
  API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tag=${searchQuery.tag}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const getUsers = () => API.get("/user");
export const getUser = (id) => API.get(`/user/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const blockUser = (id) => API.patch(`/user/block/${id}`);
export const unlockUser = (id) => API.patch(`/user/unlock/${id}`);
export const addToAdmin = (id) => API.patch(`/user/addAdmin/${id}`);
export const removeFromAdmin = (id) => API.patch(`/user/rmAdmin/${id}`);
