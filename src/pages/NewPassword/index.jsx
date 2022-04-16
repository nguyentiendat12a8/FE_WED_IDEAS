import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/common/Input";
import { userConfirmResetPasswordRequest } from "../../store/request";
import { showNotification } from "../../utils/messages";
import "./index.scss";

const NewPassword = () => {
  const [formData, setFormData] = useState({
    accountPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { userId, token } = useParams();

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
      const { data } = await userConfirmResetPasswordRequest(
        userId,
        token,
        formData
      );
      showNotification("success", data);
      setIsDisabled(true);
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
    <section className="change-password">
      <form onSubmit={onSubmit}>
        <h1>New password</h1>
        <Input
          name="accountPassword"
          type="password"
          onChange={onChangeHandler}
          placeholder="New password"
          value={formData.accountPassword}
        />
        <button
          className="btn"
          type="submit"
          disabled={isLoading || isDisabled}
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default NewPassword;
