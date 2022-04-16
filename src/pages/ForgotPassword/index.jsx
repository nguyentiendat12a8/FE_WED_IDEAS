import React, { useState } from "react";
import Input from "../../components/common/Input";
import { userSendResetPasswordRequest } from "../../store/request";
import { showNotification } from "../../utils/messages";
import "./index.scss";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    accountEmail: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

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
      const { data } = await userSendResetPasswordRequest(formData);
      showNotification("success", data.message);
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
        <h1>Forgot password</h1>
        <Input
          name="accountEmail"
          type="email"
          onChange={onChangeHandler}
          placeholder="Email"
          value={formData.accountEmail}
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

export default ForgotPassword;
