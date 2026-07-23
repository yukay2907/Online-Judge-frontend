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
    <div>
      <h1>Problems</h1>

      {problems.length === 0 ? (
        <p>No problems found.</p>
      ) : (
        problems.map((problem) => (
          <Link key={problem._id} to={`/problems/${problem._id}`}>
            <div>
              <h2>{problem.title}</h2>
              <p>{problem.difficulty}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Problems;
