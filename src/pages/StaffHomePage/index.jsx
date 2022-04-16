import React from "react";
import "./index.scss";
import FilterIdeaByProperties from "../../components/common/FilterIdeaByProperties";
import IdeaGrid from "../../components/common/IdeaGrid";
import DashboardBanner from "../../components/common/DashboardBanner";

const StaffHomePage = () => {
  return (
    <div className="staff-homepage main-content-dashboard">
      <DashboardBanner />
      <FilterIdeaByProperties />
      <IdeaGrid />
    </div>
  );
};

export default StaffHomePage;
