import api from "./axios";

const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
};

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data.data;
};

const getCurrentUser = async () => {
  const response = await api.get("/auth/current-user");
  return response.data.data;
};

const logout = async () => {
  await api.post("/auth/logout");
};

export default {
  login,
  register,
  logout,
  getCurrentUser,
};
