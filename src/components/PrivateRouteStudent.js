// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRouteStudent = ({ element: Element, role, ...rest }) => {
  // Check if the user has the required role to access the route
  const isAuthorized = role === 3; // Adjust the condition based on your requirements

  return (
    <Route
      {...rest}
      element={isAuthorized ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRouteStudent;
