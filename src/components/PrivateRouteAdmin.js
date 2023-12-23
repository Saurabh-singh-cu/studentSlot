// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ element: Element, allowedRoles, userRole, ...rest }) => {
  // Check if the user has one of the allowed roles to access the route
  const isAuthorized = allowedRoles.includes(userRole);

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRouteAdmin;
