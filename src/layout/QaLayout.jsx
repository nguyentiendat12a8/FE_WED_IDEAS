import React from "react";
import DashboardHeader from "../components/common/DashboardHeader";
import QaSidebar from "../components/common/QaSidebar";
import "./index.scss";

const QaLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main className="qa-main">
        <QaSidebar />
        <aside className="sidebar-mock" />
        {children}
      </main>
    </>
  );
};

export default QaLayout;
