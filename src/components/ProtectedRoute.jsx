import React from "react";
import { Navigate } from "react-router";
import useAuthStore from "../store/useAuthStore";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div className="text-center py-10 text-lg">טוען...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
