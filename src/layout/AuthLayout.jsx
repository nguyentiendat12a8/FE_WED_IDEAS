import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const { token: isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(`/login?redirectUrl=${window.location.pathname}`);
    }
  }, [isAuth, navigate]);

  return <>{children}</>;
};

export default AuthLayout;
