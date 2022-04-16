import React, { useState } from "react";
// import { AreaChartOutlined } from "@ant-design/icons";
import "./index.scss";
// import { FolderOutlined } from "@ant-design/icons";
// import { statsJson } from "../../assets/data";
import DashboardBanner from "../../components/common/DashboardBanner";
import FilterIdeaByProperties from "../../components/common/FilterIdeaByProperties";
import IdeaGrid from "../../components/common/IdeaGrid";
import {
  downloadIdeasRequest,
  downloadZipFileRequest,
} from "../../store/request";
import "./index.scss";
import { showNotification } from "../../utils/messages";
import { CSVLink } from "react-csv";
import FileDownload from "js-file-download";
import { useRef } from "react";

const QaHomePage = () => {
  // const [stats] = useState(statsJson);

  const [isDownloading, setIsDownloading] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const downloadFileRef = useRef(null);

  const onDownloadZipFile = () => {
    setIsDownloading(true);
    downloadZipFileRequest()
      .then(({ data }) => {
        FileDownload(data, "ideas.zip");
      })
      .catch((err) =>
        showNotification("error", err?.response?.data?.message || err?.message)
      )
      .finally(() => setIsDownloading(false));
  };

  const onDownloadFiles = () => {
    setIsDownloading(true);
    downloadIdeasRequest()
      .then(({ data }) => {
        setIdeas(data.data);
      })
      .catch((err) =>
        showNotification("error", err?.response?.data?.message || err?.message)
      )
      .finally(() => setIsDownloading(false));
  };

  return (
    <div className="qa-homePage main-content-dashboard">
      <DashboardBanner />
      <div className="qa-homepage__top">
        <button
          className="btn btn-sm"
          onClick={onDownloadZipFile}
          disabled={isDownloading}
        >
          Dowload zip file
        </button>
        {ideas.length > 0 ? (
          <CSVLink
            className="btn btn-sm"
            headers={[
              { label: "Ideas Content", key: "ideasContent" },
              { label: "Number Of Comments", key: "numberOfComment" },
              { label: "Number Of Likes", key: "numberOfLike" },
              { label: "Number Of Dislikes", key: "numberOfDislike" },
              { label: "Number Of Views", key: "numberOfView" },
            ]}
            data={ideas}
            filename="ideas.csv"
            ref={downloadFileRef}
          >
            Save Files
          </CSVLink>
        ) : (
          <button
            className="btn btn-sm"
            onClick={onDownloadFiles}
            disabled={isDownloading}
          >
            Down ideas
          </button>
        )}
        <FilterIdeaByProperties />
      </div>
      <IdeaGrid />
      {/* <h1 className="title">
        <AreaChartOutlined />
        <span>Statistic systems</span>
      </h1>
      <div className="stats">
        {stats.map((statItem) => (
          <div key={statItem.id} className="stat">
            <FolderOutlined style={{ fontSize: 32 }} />
            <p>{statItem.title}</p>
            <div>
              <strong>{statItem.count}</strong> {statItem.type}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default QaHomePage;
