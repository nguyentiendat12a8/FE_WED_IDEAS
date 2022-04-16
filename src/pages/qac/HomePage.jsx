import { UnorderedListOutlined } from "@ant-design/icons";
import React from "react";
import FilterIdeaByProperties from "../../components/common/FilterIdeaByProperties";
import IdeaGrid from "../../components/common/IdeaGrid";
import "./index.scss";

const QacHomePage = () => {
  return (
    <div className="qac-homepage main-content-dashboard">
      <h1 className="title">
        <UnorderedListOutlined />
        <span>List idea</span>
      </h1>
      <FilterIdeaByProperties />
      <IdeaGrid />
    </div>
  );
};

export default QacHomePage;
