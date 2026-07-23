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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      setError("Please enter some code before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const createdSubmission = await submissionApi.createSubmission({
        problemId,
        language: "python",
        code,
      });

      setSubmission(createdSubmission);
      setError(null);
    } catch (error) {
      console.error(error);

      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold">{problem.title}</h1>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium
              ${
                problem.difficulty === "Easy"
                  ? "bg-green-100 text-green-700"
                  : problem.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {problem.difficulty}
            </span>
          </div>

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Description</h2>

            <p className="text-gray-700 whitespace-pre-line">
              {problem.description}
            </p>
          </div>

          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sample Input</h2>

            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {problem.testCases?.[0]?.input ?? "No sample input available."}
            </pre>

            <h2 className="text-xl font-semibold mt-6 mb-4">Sample Output</h2>

            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              {problem.testCases?.[0]?.output ?? "No sample output available."}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Python Solution</h2>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your Python solution here..."
              className="w-full h-[420px] border rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              {isSubmitting ? "Submitting..." : "Submit Solution"}
            </button>

            {error && <p className="text-red-600 mt-4">{error}</p>}
          </div>

          {submission && (
            <div className="border rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Latest Submission</h2>

              <div className="flex justify-between">
                <span>Verdict</span>
                <span className="font-semibold">{submission.verdict}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Status</span>
                <span>{submission.status}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Runtime</span>
                <span>{submission.runtime ?? "-"}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Memory</span>
                <span>{submission.memory ?? "-"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemDetails;
