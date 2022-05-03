import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const checkDetails = (component) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!user.isAdmin && component[0]?.type?.name === "BookIn") {
      return null;
    }

    return component;
  };

  return checkDetails(children);
};

export default ProtectedRoute;
