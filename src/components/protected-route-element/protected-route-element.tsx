import React from "react";
import { useAppSelector } from "../../utils/hooks";
import { useLocation, Navigate } from "react-router-dom";
import { FC, ReactElement, useEffect, useState } from "react";

type TProtectedProps = {
  anonymous?: boolean;
  element: ReactElement;
};

export const ProtectedRouteElement: FC<TProtectedProps> = ({
  element,
  anonymous = false,
}) => {
  const user = useAppSelector((store) => store.authReducer.user);
  const location = useLocation();  
  const token = localStorage.getItem("accessToken");
  const from = location.state?.from || "/";

  if (anonymous && user) {
    return <Navigate to={from}/>;
  }

  if (!anonymous && !user && !token) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  if (location.pathname === "/reset-password" && location.state !== "/forgot-password") {
    return <Navigate to="/login" state={{from: location}}/>;
  }
  return element;
}
