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
    <div>
      <h1>My Submissions</h1>

      <table>
        <thead>
          <tr>
            <th>Problem</th>
            <th>Verdict</th>
            <th>Language</th>
            <th>Status</th>
            <th>Runtime</th>
            <th>Memory</th>
            <th>Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.problem.title}</td>
              <td>{submission.verdict}</td>
              <td>{submission.language}</td>
              <td>{submission.status}</td>
              <td>{submission.runtime ?? "-"}</td>
              <td>{submission.memory ?? "-"}</td>
              <td>{new Date(submission.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Submissions;
