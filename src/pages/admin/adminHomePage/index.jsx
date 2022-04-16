import React from "react";
import { AreaChartOutlined } from "@ant-design/icons";
import "./index.scss";
import FilterIdeaByProperties from "../../../components/common/FilterIdeaByProperties";
import IdeaGrid from "../../../components/common/IdeaGrid";
import DashboardBanner from "../../../components/common/DashboardBanner";

const AdminHomePage = () => {
  return (
    <div className="admin-homePage main-content-dashboard">
      <h1 className="title">
        <AreaChartOutlined />
        <span>Admin Home Page</span>
      </h1>
      <DashboardBanner />
      <FilterIdeaByProperties />
      <IdeaGrid />
    </div>
  );
};

export default AdminHomePage;
