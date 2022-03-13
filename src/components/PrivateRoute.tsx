import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute: React.FC = ({ children }) =>  {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}

export default PrivateRoute;