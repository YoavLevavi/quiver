import React from "react";
import { Navigate } from "react-router";
import useAuthStore from "../store/useAuthStore";
import LoadingIndicator from "./UI/LoadingIndicator";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
