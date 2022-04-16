import axiosInstance from "../axios";

const getRoleListRequest = () =>
  axiosInstance({
    method: "GET",
    url: `/user/list-role`,
  });
const getQaDashboardDataRequest = () =>
  axiosInstance({
    method: "GET",
    url: "/dashboard/view-dashboard ",
  });

export { getRoleListRequest, getQaDashboardDataRequest };
