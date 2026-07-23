import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import problemApi from "../api/problemApi";

function Problems() {
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const fetchedProblems = await problemApi.getProblems();

        setProblems(fetchedProblems);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProblems();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Problems</h1>

        <span className="text-gray-500">{problems.length} Problems</span>
      </div>

      {problems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No problems found.
        </div>
      ) : (
        <div className="overflow-hidden border rounded-xl shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Difficulty</th>
                <th className="text-right px-6 py-4"></th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{problem.title}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
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
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/problems/${problem._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Solve →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Problems;
