import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, isAdminRequired, ...rest }) => {
  const user = useSelector((state) => state.users.user?.data);

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (isAdminRequired && user.role !== "admin") {
    // Redirect to unauthorized page if user is not admin
    return <Navigate to="/unauthorized" replace />;
  }

  // Render the protected component if user is authenticated and authorized
  return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;
