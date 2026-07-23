import api from "./axios";

const createSubmission = async ({ problemId, language, code }) => {
  const response = await api.post("/submissions", {
    problemId,
    language,
    code,
  });

  return response.data.data;
};

export default { createSubmission };
