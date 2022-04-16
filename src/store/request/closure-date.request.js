import axiosInstance from "../axios";

const getClosureDateListRequest = () =>
  axiosInstance({
    method: "GET",
    url: `/closureDate/list-closure-date`,
  });

const createOrUpdateClosureDateRequest = (data) =>
  axiosInstance({
    method: data._id ? "PUT" : "POST",
    url: data._id
      ? `/closureDate/update-closure-date/${data._id}`
      : `/closureDate/create-closure-date`,
    data: data._id
      ? { ...data, _id: undefined, departmentName: undefined }
      : data,
  });
export { getClosureDateListRequest, createOrUpdateClosureDateRequest };
