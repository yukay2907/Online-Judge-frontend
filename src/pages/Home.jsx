import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Practice Coding.
          <span className="text-blue-600"> Improve Every Day.</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Solve coding problems, submit Python solutions, and receive instant
          verdicts. Track your progress with a simple online judge built using
          the MERN stack.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/problems"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Solve Problems
          </Link>

          {isAuthenticated ? (
            <Link
              to="/submissions"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              View My Submissions
            </Link>
          ) : (
            <Link
              to="/register"
              className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mt-20">
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Coding Problems</h2>

          <p className="text-gray-600">
            Browse coding problems ranging from Easy to Hard and sharpen your
            problem-solving skills.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Instant Verdicts</h2>

          <p className="text-gray-600">
            Submit Python solutions and instantly receive Accepted, Wrong
            Answer, Runtime Error, or other verdicts.
          </p>
        </div>

        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Track Progress</h2>

          <p className="text-gray-600">
            View your submission history, monitor your progress, and improve
            with every attempt.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
