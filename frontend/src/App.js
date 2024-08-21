import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages and Components
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./pages/About";
import EditWorkout from "./pages/EditWorkout";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";

const AuthHandler = ({ children }) => {
  const { auth, setAuth } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates loading state

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      setAuth({ token });
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [setAuth]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={
              <AuthHandler>
                <Home />
              </AuthHandler>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AuthHandler>
                <EditWorkout />
              </AuthHandler>
            }
          />``
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
