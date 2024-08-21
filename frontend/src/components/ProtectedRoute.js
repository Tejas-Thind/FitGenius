import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If there's no logged-in user, redirect to the login page
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children
  return children;
};

export default ProtectedRoute;