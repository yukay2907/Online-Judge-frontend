import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Problems from "../pages/Problems";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Submissions from "../pages/Submissions";
import ProtectedRoute from "../components/ProtectedRoute";
import ProblemDetails from "../pages/ProblemDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:problemId" element={<ProblemDetails />} />
          <Route
            path="/submissions"
            element={
              <ProtectedRoute>
                <Submissions />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
