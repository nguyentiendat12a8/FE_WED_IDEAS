import axiosInstance from "../axios";

const authLoginRequest = (formData) =>
  axiosInstance({
    method: "POST",
    url: "/user/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: formData,
  });

const authSignupRequest = (formData) =>
  axiosInstance({
    method: "POST",
    url: "/user/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: formData,
  });
export { authLoginRequest, authSignupRequest };
