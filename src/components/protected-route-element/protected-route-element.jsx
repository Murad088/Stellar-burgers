import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";


export default function ProtectedRouteElement({ element, anonymous = false }) {
  const isLoggedIn = useSelector((store) => store.authReducer.user);
  const user = useSelector((store) => store.authReducer.user);
  
  const location = useLocation();  
  const from = location.state || "/";
  console.log(user);


  if (anonymous && user) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !user) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  if (location.pathname === "/reset-password" && location.state !== "/forgot-password") {
    return <Navigate to="/login" state={{ from: location }} />;
  }


  return element;
}



ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
};