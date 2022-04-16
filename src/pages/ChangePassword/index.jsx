import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import { userEditPasswordRequest } from "../../store/request";
import { showNotification } from "../../utils/messages";
import "./index.scss";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    accountPassword: "",
    newAccountPassword: "",
    newAccountPasswordAgain: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await userEditPasswordRequest(formData);
      console.log(data);
      navigate("/");
    } catch (error) {
      showNotification(
        "error",
        error?.response?.data?.message ||
          error?.response?.data ||
          error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="change-password main-content-dashboard">
      <form onSubmit={onSubmit}>
        <h1>Change password</h1>
        <Input
          name="accountPassword"
          type="password"
          onChange={onChangeHandler}
          placeholder="Old password"
          value={formData.accountPassword}
        />
        <Input
          name="newAccountPassword"
          type="password"
          onChange={onChangeHandler}
          placeholder="New password"
          value={formData.newAccountPassword}
        />
        <Input
          name="newAccountPasswordAgain"
          type="password"
          onChange={onChangeHandler}
          placeholder="Confirm new password"
          value={formData.newAccountPasswordAgain}
        />
        <button className="btn" type="submit" disabled={isLoading}>
          Save
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
