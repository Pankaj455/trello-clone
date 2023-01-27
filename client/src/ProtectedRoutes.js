import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.getItem("auth-token") ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
