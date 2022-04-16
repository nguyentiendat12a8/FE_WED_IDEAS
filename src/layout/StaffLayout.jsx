import React from "react";
import DashboardHeader from "../components/common/DashboardHeader";
import StaffSidebar from "../components/common/StaffSidebar";
import "./index.scss";

const StaffLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main className="staff-main">
        <StaffSidebar />
        <aside className="sidebar-mock" />
        {children}
      </main>
    </>
  );
};

export default StaffLayout;
