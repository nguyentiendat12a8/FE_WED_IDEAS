import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input";
import { getUserInfoRequest, userEditInfoRequest } from "../../store/request";
import "./index.scss";
import { showNotification } from "../../utils/messages";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [userForm, setUserForm] = useState({
    phone: "",
    address: "",
    gender: "other",
    DOB: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const decodedData = jwt_decode(token);

  useEffect(() => {
    getUserInfoRequest(decodedData.id)
      .then(({ data }) => {
        setUserForm({
          phone: data.data.phone,
          address: data.data.address,
          gender: data.data.gender,
          DOB: data.data.DOB,
        });
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
  }, [decodedData.id]);

  const onChange = (e) =>
    setUserForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  let listGenderMarkup = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "other",
      label: "Other",
    },
  ].map((g) => (
    <option key={g.value} value={g.value}>
      {g.label}
    </option>
  ));

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    userEditInfoRequest(userForm)
      .then(({ data }) => {
        showNotification("success", data?.message);
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

  return (
    <div className="profile-form main-content-dashboard">
      <h1 className="title">Update profile information</h1>
      <form>
        <Input
          value={userForm.phone}
          onChange={onChange}
          name="phone"
          label="Phone Number"
        />
        <Input
          value={userForm.address}
          onChange={onChange}
          name="address"
          label="Address"
        />
        <Input
          type="select"
          value={userForm.gender}
          onChange={onChange}
          name="gender"
          label="Gender"
        >
          {listGenderMarkup}
        </Input>
        <Input
          value={userForm.DOB}
          onChange={onChange}
          name="DOB"
          label="DOB"
        />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn"
          disabled={isLoading}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
