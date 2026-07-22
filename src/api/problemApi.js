import api from "./axios";

const getProblems = async () => {
  const response = await api.get("/problems");

  return response.data.data;
};

const getProblemById = async (problemId) => {
  const response = await api.get(`/problems/${problemId}`);

  return response.data.data;
};

export default {
  getProblems,
  getProblemById,
};
