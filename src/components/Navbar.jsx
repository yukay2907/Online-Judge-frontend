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
    <nav>
      <h2>Online Judge</h2>

      <ul>
        {navItems.map((item) => {
          return (
            <li key={item.name}>
              {item.name === "Logout" ? (
                <button onClick={handleLogout}>{item.name}</button>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
