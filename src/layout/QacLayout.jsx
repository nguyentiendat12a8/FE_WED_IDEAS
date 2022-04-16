import React from "react";
import DashboardHeader from "../components/common/DashboardHeader";
import QacSidebar from "../components/common/QacSidebar";
import "./index.scss";

const QacLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main className="qa-main">
        <QacSidebar />
        <aside className="sidebar-mock" />
        {children}
      </main>
    </>
  );
};

export default QacLayout;
