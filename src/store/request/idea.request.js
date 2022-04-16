import axiosInstance from "../axios";

const getIdeaListRequest = (isStaff = false) =>
  axiosInstance.get(`/ideas/list${isStaff ? "-my" : ""}-ideas`);

const getIdeaDetailRequest = (ideaId) =>
  axiosInstance.get("/ideas/view-detail-ideas/" + ideaId);

const likeIdeaRequest = (ideaId) =>
  axiosInstance.post("/ideas/like-ideas/" + ideaId);

const dislikeIdeaRequest = (ideaId) =>
  axiosInstance.post("/ideas/dislike-ideas/" + ideaId);

const createIdeaRequest = (ideaData) =>
  axiosInstance.post("/ideas/upload-ideas", ideaData);

const filterIdeaListRequest = (filter) =>
  axiosInstance.get(`/ideas/filter?filter=${filter}`);

const getIdeaCommentsRequest = (ideaId) =>
  axiosInstance.get("/ideas/list-comment-ideas/" + ideaId);

const commentOnIdeaRequest = (ideaId, data) =>
  axiosInstance.post("/ideas/comment-ideas/" + ideaId, data);

const downloadIdeasRequest = () => axiosInstance.get(`/ideas/download-ideas`);

const downloadZipFileRequest = () =>
  axiosInstance({
    url: `/ideas/download-zip`,
    method: "GET",
    responseType: "blob",
  });

const downloadIdeaPdfFileRequest = (filename) =>
  axiosInstance({
    url: `/ideas/download-files/${filename}`,
    method: "GET",
    responseType: "blob",
  });

export {
  getIdeaListRequest,
  getIdeaDetailRequest,
  likeIdeaRequest,
  dislikeIdeaRequest,
  createIdeaRequest,
  filterIdeaListRequest,
  getIdeaCommentsRequest,
  commentOnIdeaRequest,
  downloadIdeasRequest,
  downloadZipFileRequest,
  downloadIdeaPdfFileRequest,
};
