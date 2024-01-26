import React from "react";
import PropTypes from "prop-types";
import { userDataRequest } from "../../utils/api";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRouteElement({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.authReducer.user);
  const location = useLocation();

  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};