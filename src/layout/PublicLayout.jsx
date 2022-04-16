import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { navigateByRole } from "../utils/navigation";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();

  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (role) {
      navigateByRole(role, navigate);
    }
  }, [role, navigate]);

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicLayout;
