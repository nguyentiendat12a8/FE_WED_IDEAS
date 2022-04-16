import React, { useEffect, useState } from "react";
import BaseListHeader from "../../../components/BaseListHeader";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import UserDataList from "../../../components/admin/UserDataList";
import {
  getUserListAction,
  hideModalAction,
  showModalAction,
} from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import {
  userForceDeletePermanentRequest,
  userRestoreRequest,
} from "../../../store/request";
import { showNotification } from "../../../utils/messages";
import ModalForm from "../../../components/common/ModalForm";

const UserList = () => {
  const [deleteUserId, setDeleteUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);

  const type = query.get("type");

  console.log(type);

  useEffect(() => {
    dispatch(getUserListAction(type));
  }, [dispatch, type]);

  const onRestore = (id) => {
    userRestoreRequest(id)
      .then(({ data }) => {
        showNotification("success", data.message);
        dispatch(getUserListAction(type));
      })
      .catch((error) => {
        showNotification(
          "error",
          error?.response?.data?.message ||
            error?.response?.data ||
            error?.message
        );
      });
  };

  const onDeletePermanent = (id) => {
    setDeleteUserId(id);
    dispatch(showModalAction());
  };

  const onConfirmDeletePermanent = () => {
    setIsLoading(true);
    userForceDeletePermanentRequest(deleteUserId)
      .then(({ data }) => {
        showNotification("success", data.message);
        setDeleteUserId("");
        dispatch(getUserListAction(type));
        dispatch(hideModalAction());
      })
      .catch((error) => {
        showNotification(
          "error",
          error?.response?.data?.message ||
            error?.response?.data ||
            error?.message
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="user-list main-content-dashboard">
      <h1 className="title">Manager user</h1>
      {type === "trash" ? null : (
        <BaseListHeader
          hideSearch
          btnTile="Create new account"
          dispatchAction={() => navigate("/admin/users/new")}
        />
      )}
      <UserDataList
        list={users.list}
        isLoading={users.isLoading}
        onNavigate={(id) => navigate(`/admin/users/${id}`)}
        type={type}
        onRestore={onRestore}
        onDeletePermanent={onDeletePermanent}
      />
      <div className={`recycle-btn ${type === "trash" ? "d-none" : ""}`}>
        <button
          className="btn"
          disabled={users.isLoading}
          onClick={() => navigate(`/admin/users?type=trash`)}
        >
          Recycle bin
        </button>
      </div>
      <ModalForm
        title="Force Delete User"
        btnTitle="Yes"
        btnCancelTitle="No"
        onSubmit={onConfirmDeletePermanent}
        isLoading={isLoading}
        closeAction={() => setDeleteUserId("")}
      >
        <div className="add-category">
          <p>
            Are you sure to delete this account? This action will not be
            unrecoverable!
          </p>
        </div>
      </ModalForm>
    </div>
  );
};

export default UserList;
