import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/common/Input";
import { authSignupRequest } from "../../../store/request";
import { showNotification } from "../../../utils/messages";
import "./index.scss";

const NewAccount = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.global);

  useEffect(() => {
    if (role.list.length > 0) {
      setUser((prevState) => ({
        ...prevState,
        roleName: role.list?.[0]?.roleName,
      }));
    }
  }, [role.list]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const createUserHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { data } = await authSignupRequest(user);
        showNotification("success", data?.message);
        navigate("/admin/users");
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [user, navigate]
  );

  return (
    <div className="user-create main-content-dashboard">
      <h1 className="title">Create new account</h1>
      <form onSubmit={createUserHandler}>
        <Input
          value={user?.accountEmail}
          label="Account Email"
          onChange={onChange}
          name="accountEmail"
        />
        <Input
          value={user?.accountPassword}
          label="Account Password"
          type="password"
          onChange={onChange}
          name="accountPassword"
        />
        <Input
          value={user?.phone}
          label="Phone"
          onChange={onChange}
          name="phone"
        />
        <Input
          value={user?.address}
          label="Address"
          onChange={onChange}
          name="address"
        />
        <Input
          value={user?.gender}
          label="Gender"
          onChange={onChange}
          name="gender"
        />
        <Input
          type="date"
          value={user?.DOB}
          label="DOB"
          onChange={onChange}
          name="DOB"
        />
        <Input
          value={user?.roleName}
          type="select"
          onChange={onChange}
          name="roleName"
        >
          {role.list.map((r) => (
            <option key={r.roleName} value={r.roleName}>
              {r.roleName}
            </option>
          ))}
        </Input>
        <div className="actions">
          <button className="btn" type="submit" disabled={isLoading}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAccount;
