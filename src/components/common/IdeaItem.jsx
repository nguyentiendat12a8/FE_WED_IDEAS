import {
  CommentOutlined,
  DislikeOutlined,
  EyeOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { iconFontSizeStyle } from "../../pages/IdeaDetail";
import "./styles/ideaItem.scss";

const IdeaItem = ({ ideaItem, likeIdeaHandler, dislikeIdeaHandler, role }) => {
  return (
    <div className="idea-item">
      <div className="media">
        <Link
          to={`/${
            role === "qa of business" ||
            role === "qa of graphic design" ||
            role === "qa of it"
              ? "qac"
              : role
          }/idea/${ideaItem._id}`}
        >
          <div className="img">
            {ideaItem.ideasContent?.length > 40
              ? ideaItem.ideasContent?.substr(0, 40) + "..."
              : ideaItem.ideasContent}
          </div>
        </Link>
      </div>
      <div className="body">
        <div className="actions">
          <button
            className="btn btn-sm"
            onClick={() => likeIdeaHandler(ideaItem._id)}
          >
            <LikeOutlined style={iconFontSizeStyle} />{" "}
            <span>{ideaItem.numberOfLike}</span>
          </button>
          <button
            className="btn btn-sm"
            onClick={() => dislikeIdeaHandler(ideaItem._id)}
          >
            <DislikeOutlined style={iconFontSizeStyle} />{" "}
            <span>{ideaItem.numberOfDislike}</span>
          </button>
          <button className="btn btn-sm">
            <CommentOutlined style={iconFontSizeStyle} />{" "}
            <span>{ideaItem.numberOfComment || 0}</span>
          </button>
          <button className="btn btn-sm">
            <EyeOutlined style={iconFontSizeStyle} />{" "}
            <span>{ideaItem.numberOfView || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaItem;
