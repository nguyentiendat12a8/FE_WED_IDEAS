import axiosInstance from "../axios";

const userEditPasswordRequest = (data) =>
  axiosInstance({
    method: "PATCH",
    url: "/user/update-password",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

const userSendResetPasswordRequest = (data) =>
  axiosInstance({
    method: "POST",
    url: "/user/send-email-reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

const userConfirmResetPasswordRequest = (uid, token, data) =>
  axiosInstance({
    method: "POST",
    url: `/user/confirmLink/${uid}/${token}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

const getUserListRequest = (type) =>
  axiosInstance({
    method: "GET",
    url: `/user/${type === "trash" ? "trash-user-account" : "list-account"}`,
  });

const getUserInfoRequest = (id) =>
  axiosInstance({
    method: "GET",
    url: "/user/view-detail-account/" + id,
  });

const userEditInfoRequest = (data) =>
  axiosInstance({
    method: "PATCH",
    url: "/user/update-account",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

const userDeleteAccountRequest = (userId) =>
  axiosInstance({
    method: "PATCH",
    url: "/user/delete-user-account/" + userId,
  });

const userRestoreRequest = (id) =>
  axiosInstance({
    method: "POST",
    url: "/user/restore-user-account/" + id,
  });

const userForceDeletePermanentRequest = (id) =>
  axiosInstance({
    method: "DELETE",
    url: "/user/force-delete-user-account/" + id,
  });

export {
  userEditPasswordRequest,
  userSendResetPasswordRequest,
  userConfirmResetPasswordRequest,
  getUserListRequest,
  userEditInfoRequest,
  getUserInfoRequest,
  userDeleteAccountRequest,
  userRestoreRequest,
  userForceDeletePermanentRequest,
};
