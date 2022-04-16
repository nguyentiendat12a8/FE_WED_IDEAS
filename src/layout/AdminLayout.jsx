import React from "react";
import AdminSidebar from "../components/common/AdminSidebar";
import DashboardHeader from "../components/common/DashboardHeader";
import "./index.scss";

const AdminLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main className="admin-main">
        <AdminSidebar />
        <aside className="sidebar-mock" />
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
