import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to correct dashboard based on role
    if (user.role === "superadmin") return <Navigate to="/superadmin/dashboard" replace />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
