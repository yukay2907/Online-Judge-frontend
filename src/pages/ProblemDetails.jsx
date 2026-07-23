import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import problemApi from "../api/problemApi";
import submissionApi from "../api/submissionApi";

function ProblemDetails() {
  const { problemId } = useParams();

  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        const fetchedProblem = await problemApi.getProblemById(problemId);

        setProblem(fetchedProblem);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProblem();
  }, [problemId]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      return;
    }

    try {
      const createdSubmission = await submissionApi.createSubmission({
        problemId,
        language: "python",
        code,
      });

      setSubmission(createdSubmission);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div>
      <h1>Problem Details</h1>

      <h2>{problem.title}</h2>

      <p>{problem.description}</p>

      <h3>Sample Input</h3>

      <pre>{problem.testCases[0].input}</pre>

      <h3>Sample Output</h3>

      <pre>{problem.testCases[0].output}</pre>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={15}
        cols={80}
      />

      <button onClick={handleSubmit}>Submit</button>

      {submission && (
        <div>
          <h3>Submission Result</h3>

          <p>Verdict: {submission.verdict}</p>
        </div>
      )}

      <p>{problem.difficulty}</p>
    </div>
  );
}

export default ProblemDetails;
