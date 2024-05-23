import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthChecker = () => {
  const auth = localStorage.getItem("id") !== null;
  return <>{auth ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default AuthChecker;
