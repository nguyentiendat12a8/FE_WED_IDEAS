import {
  CommentOutlined,
  DislikeOutlined,
  LikeOutlined,
  UnorderedListOutlined,
  SendOutlined,
  EyeOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getIdeaDetailAction } from "../../store/actions";
import "./index.scss";
import {
  dislikeIdeaRequest,
  likeIdeaRequest,
  commentOnIdeaRequest,
  downloadIdeaPdfFileRequest,
} from "../../store/request";
import moment from "moment";
import { saveAs } from "file-saver";
import { showNotification } from "../../utils/messages";

export const iconFontSizeStyle = { fontSize: 12 };

const IdeaDetail = () => {
  const dispatch = useDispatch();
  const { ideaId } = useParams();
  const [commentText, setCommentText] = useState("");
  const {
    idea: { detail },
    auth: { role },
  } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    dispatch(getIdeaDetailAction(ideaId));
  }, [dispatch, ideaId]);

  const likeIdeaHandler = () =>
    likeIdeaRequest(ideaId)
      .then((res) => {
        dispatch(getIdeaDetailAction(ideaId));
      })
      .catch((err) => {
        showNotification(
          "error",
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            err
        );
      });

  const dislikeIdeaHandler = () =>
    dislikeIdeaRequest(ideaId)
      .then((res) => {
        dispatch(getIdeaDetailAction(ideaId));
      })
      .catch((err) => {
        showNotification(
          "error",
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            err
        );
      });

  const onCommentHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    commentOnIdeaRequest(ideaId, {
      commentText,
      anonymous: Boolean(anonymous),
    })
      .then(() => {
        setCommentText("");
        dispatch(getIdeaDetailAction(ideaId));
      })
      .catch((err) => {
        showNotification(
          "error",
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            err
        );
      })
      .finally(() => setIsLoading(false));
  };

  const onDownloadHandler = (e) => {
    e.preventDefault();
    setIsDownloading(true);
    downloadIdeaPdfFileRequest(
      detail.data?.ideasShow?.ideasFile
        ?.replace("uploads/", "")
        ?.replace("uploads\\", "")
    )
      .then(({ data }) => {
        saveAs(
          data,
          detail.data?.ideasShow?.ideasFile?.replace("uploads/", "")
        );
      })
      .catch((err) => {
        showNotification(
          "error",
          err?.response?.data?.message ||
            err?.response?.data ||
            err?.message ||
            err
        );
      })
      .finally(() => setIsDownloading(false));
  };

  return (
    <div
      className={[
        "idea-detail main-content-dashboard",
        detail.isLoading ? "divDisable" : "",
      ].join(" ")}
    >
      <h1 className="title">
        <UnorderedListOutlined />
        <span>View detail idea</span>
      </h1>
      <div className="top-info">
        <div className="author">
          <p>Author: {detail.data?.ideasShow?.name}</p>
        </div>
        <div className="dept">
          <p>Department: {detail.data?.ideasShow?.departmentName}</p>
        </div>
        <div className="dept">
          <p>Category: {detail.data?.ideasShow?.categoryName}</p>
        </div>
      </div>
      <div className="flex">
        <div className="img-container">
          <div className="img">{detail.data?.ideasShow?.ideasContent}</div>
        </div>
        <div className="info">
          <div className="idea-blocks">
            <div className="idea-block">
              <div className="file">
                <a
                  href={`${
                    process.env.NODE_ENV === "development"
                      ? "http://localhost:5000"
                      : ""
                  }/${detail.data?.ideasShow?.ideasFile}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onDownloadHandler}
                  disabled={isDownloading}
                >
                  <FolderOutlined style={iconFontSizeStyle} />{" "}
                  <span>{detail.data?.ideasShow?.ideasFile}</span>
                </a>
              </div>
              <div className="inner">
                <button
                  className={`btn ${
                    detail?.data?.checkLike ? "btn-active" : ""
                  }`}
                  onClick={likeIdeaHandler}
                >
                  <LikeOutlined style={iconFontSizeStyle} />{" "}
                  <strong>{detail.data?.ideasShow?.numberOfLike}</strong>
                </button>
                <button
                  className={`btn ${
                    detail?.data?.checkDislike ? "btn-active" : ""
                  }`}
                  onClick={dislikeIdeaHandler}
                >
                  <DislikeOutlined style={iconFontSizeStyle} />{" "}
                  <strong>{detail.data?.ideasShow?.numberOfDislike}</strong>
                </button>
                <button className="btn">
                  <CommentOutlined style={iconFontSizeStyle} />{" "}
                  <strong>
                    {detail.data?.ideasShow?.numberOfComment || 0}
                  </strong>
                </button>
                <button className="btn">
                  <EyeOutlined style={iconFontSizeStyle} />{" "}
                  <strong>{detail.data?.ideasShow?.numberOfView || 0}</strong>
                </button>
              </div>
            </div>
            <div className="idea-block no-flex">
              <div className="inner-block comments">
                {detail.data?.showComment?.map((cmt) => (
                  <div key={cmt.createdAt}>
                    <div className="comment-block">
                      {cmt.commentText} ({cmt.author}) -{" "}
                      {moment(cmt.createdAt).fromNow()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="comments">
                <form onSubmit={onCommentHandler}>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="btn btn-sm"
                    type="submit"
                    disabled={isLoading}
                  >
                    <SendOutlined style={iconFontSizeStyle} />
                  </button>
                </form>
                <div className="mt-1">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                    />
                    <span className="slider round" />
                  </label>
                  <p>Anonymous</p>
                </div>
              </div>
            </div>
          </div>
          <div className="actions">
            <Link
              className="btn"
              to={
                role === "admin" ? "/admin/home" : `/${role.toLowerCase()}/idea`
              }
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;
