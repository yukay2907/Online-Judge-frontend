import submissionApi from "../api/submissionApi";
import { useEffect, useState } from "react";

function Submissions() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const fetchedSubmissions = await submissionApi.getSubmissions();

        setSubmissions(fetchedSubmissions);
      } catch (error) {
        console.error(error);

        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (submissions.length === 0) {
    return <div>No submissions yet.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Submissions</h1>

        <span className="text-gray-500">{submissions.length} Total</span>
      </div>

      <div className="overflow-hidden border rounded-xl shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Problem</th>
              <th className="text-left px-6 py-4">Verdict</th>
              <th className="text-left px-6 py-4">Language</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Runtime</th>
              <th className="text-left px-6 py-4">Memory</th>
              <th className="text-left px-6 py-4">Submitted</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((submission) => (
              <tr
                key={submission._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {submission.problem
                    ? submission.problem.title
                    : "Problem Deleted"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      submission.verdict === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : submission.verdict === "Wrong Answer"
                          ? "bg-red-100 text-red-700"
                          : submission.verdict === "Time Limit Exceeded"
                            ? "bg-orange-100 text-orange-700"
                            : submission.verdict === "Runtime Error"
                              ? "bg-purple-100 text-purple-700"
                              : submission.verdict === "Compilation Error"
                                ? "bg-pink-100 text-pink-700"
                                : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {submission.verdict}
                  </span>
                </td>

                <td className="px-6 py-4 capitalize">{submission.language}</td>

                <td className="px-6 py-4">{submission.status}</td>

                <td className="px-6 py-4">{submission.runtime ?? "-"}</td>

                <td className="px-6 py-4">{submission.memory ?? "-"}</td>

                <td className="px-6 py-4 text-gray-500">
                  {new Date(submission.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Submissions;
