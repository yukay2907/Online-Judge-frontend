import { useState, createContext, useEffect } from "react";
import authApi from "../api/authApi";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await authApi.getCurrentUser();
        login(user);
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthProvider };
