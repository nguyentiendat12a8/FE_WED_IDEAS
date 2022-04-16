import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import Loader from "../../../components/common/Loader";
import ModalForm from "../../../components/common/ModalForm";
import {
  getUserListAction,
  hideModalAction,
  showModalAction,
} from "../../../store/actions";
import { userDeleteAccountRequest } from "../../../store/request";
import { showNotification } from "../../../utils/messages";
import "./index.scss";

const UserDetail = () => {
  const {
    users: { list, isLoading },
  } = useSelector((state) => state.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = list.find((user) => user._id === userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!list.length) {
      dispatch(getUserListAction());
    }
  }, [dispatch, list.length]);

  const onDelete = () => {
    setIsDeleting(true);
    userDeleteAccountRequest(userId)
      .then(({ data }) => {
        showNotification("success", data?.message);
        setIsDeleting(false);
        dispatch(hideModalAction());
        navigate("/admin/users");
      })
      .catch((err) => {
        setIsDeleting(false);
        showNotification(
          "error",
          err?.message || err?.response?.data?.message || "Something went wrong"
        );
      });
  };

  return (
    <div className="user-detail main-content-dashboard">
      <h1 className="title">Account detail</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <form>
            <Input defaultValue={user?.accountEmail} label="Account Email" />
            <Input defaultValue={user?.phone} label="Phone Number" />
            <Input defaultValue={user?.address} label="Address" />
            <Input defaultValue={user?.gender} label="Gender" />
            <Input defaultValue={user?.roleName} label="Role" />
            <Input defaultValue={user?.DOB} label="DOB" />
          </form>
          <div className="actions">
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => dispatch(showModalAction())}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        </>
      )}
      <ModalForm
        title="Delete Account"
        btnTitle="Confirm"
        onSubmit={onDelete}
        isLoading={isDeleting}
        btnCancelTitle="Cancel"
      >
        <div className="">
          <p>Are you sure delete this account?</p>
        </div>
      </ModalForm>
    </div>
  );
};

export default UserDetail;
