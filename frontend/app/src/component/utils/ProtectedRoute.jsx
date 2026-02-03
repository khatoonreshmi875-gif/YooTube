import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  if (!token) {
    // No token → show AuthPage (Login/Register)
    return <Navigate to="/verify" replace />;
  }

  return children;
};

export default ProtectedRoute;
