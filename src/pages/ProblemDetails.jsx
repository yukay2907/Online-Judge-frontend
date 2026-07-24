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
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* LEFT PANEL */}
        <div className="border rounded-2xl shadow-sm p-8">
          <h1 className="text-4xl font-bold">{problem.title}</h1>

          <span
            className={`inline-block mt-4 px-4 py-1 rounded-full text-sm font-medium
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

          <hr className="my-8" />

          <h2 className="text-2xl font-semibold mb-4">Description</h2>

          <p className="whitespace-pre-line text-gray-700 leading-8">
            {problem.description}
          </p>

          <hr className="my-8" />

          <h2 className="text-2xl font-semibold mb-4">Sample Input</h2>

          <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            {problem.testCases?.[0]?.input ?? "No sample input available."}
          </pre>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Sample Output</h2>

          <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            {problem.testCases?.[0]?.output ?? "No sample output available."}
          </pre>
        </div>

        {/* RIGHT PANEL */}
        <div className="border rounded-2xl shadow-sm p-8 flex flex-col">
          <h2 className="text-3xl font-semibold mb-6">Python Solution</h2>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write your Python solution here..."
            className="w-full h-[500px] border rounded-lg p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </button>

          {error && <p className="mt-4 text-red-600">{error}</p>}

          {submission && (
            <div className="mt-8 border rounded-xl p-5 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4">Latest Submission</h3>

              <div className="flex justify-between py-2">
                <span>Verdict</span>
                <span className="font-semibold">{submission.verdict}</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Status</span>
                <span>{submission.status}</span>
              </div>

              <div className="flex justify-between py-2">
                <span>Runtime</span>
                <span>{submission.runtime ?? "-"}</span>
              </div>

              <div className="flex justify-between py-2">
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
