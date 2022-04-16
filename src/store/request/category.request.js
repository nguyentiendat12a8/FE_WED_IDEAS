import axiosInstance from "../axios";

const getCategoryListRequest = (dept) =>
  axiosInstance.get("/category/list-category?departmentName=" + dept);

const getDeparmentListRequest = () =>
  axiosInstance.get("/department/list-department");

const createCategoryRequest = (formData) =>
  axiosInstance.post(
    `/category/create-category?departmentName=${formData.departmentName}`,
    formData
  );

const deleteCategoryRequest = (id) =>
  axiosInstance.delete(`/category/delete-category/${id}`);

export {
  getCategoryListRequest,
  getDeparmentListRequest,
  createCategoryRequest,
  deleteCategoryRequest,
};
