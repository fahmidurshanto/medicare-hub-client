import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render children if authenticated
};

export default PrivateRoute;
