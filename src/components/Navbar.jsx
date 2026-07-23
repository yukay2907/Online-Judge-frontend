import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import authApi from "../api/authApi";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const navItems = isAuthenticated
    ? [
        { name: "Home", path: "/" },
        { name: "Problems", path: "/problems" },
        { name: "Submissions", path: "/submissions" },
        { name: "Logout", path: null },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Problems", path: "/problems" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  const handleLogout = async () => {
    try {
      await authApi.logout();

      logout();

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CodeX
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.name === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={
                    item.name === "Register"
                      ? "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      : "text-gray-700 hover:text-blue-600 transition"
                  }
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
