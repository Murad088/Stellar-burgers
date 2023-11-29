import React from 'react';
import { useContext, useState, createContext } from "react";
import { logoutRequest, passwordRecoveryRequest, passwordResetRequest, updateDataRequest } from "./api";
import { deleteCookie } from "./getCookie";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const passRecoveryRequest = async (form) => {
    const data = await passwordRecoveryRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({ user });
    }
  };

  const passResetRequest = async (form) => {
    const data = await passwordResetRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({ ...data.user, password: data.user.password });
    }
  };
  
  const signOut = async () => {
    await logoutRequest(user);
    setUser(null);
    deleteCookie("token");
  };
  const updateDataUserRequest = async (form) => {
    const data = await updateDataRequest(form)
      .then((res) => res.json())
      .then((data) => data);
    if (data.success) {
      setUser({
        name: data.user.name,
        email: data.user.email,
        password: data.user.password,
      });
    }
  };
  return {
    user,

    passRecoveryRequest,
    passResetRequest,

    signOut,
    updateDataUserRequest,
  };
}