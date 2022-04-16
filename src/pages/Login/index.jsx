import "./CSS/Login.css";
import ImageLoginLeft from "../../image/loginLeft.png";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { authLoginRequest } from "../../store/request";
import { useDispatch } from "react-redux";
import {
  authLoginFailedAction,
  authLoginSuccessAction,
} from "../../store/actions";
import { useNavigate } from "react-router-dom";
import { navigateByRole } from "../../utils/navigation";
import axiosInstance from "../../store/axios";
import { showNotification } from "../../utils/messages";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    accountEmail: "",
    accountPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const redirectUrl = params.get("redirectUrl");

  const onInputChange = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { data } = await authLoginRequest(loginInputs);
        dispatch(authLoginSuccessAction(data));
        axiosInstance.defaults.headers.common["x-access-token"] = data.token;
        redirectUrl
          ? navigate(redirectUrl)
          : navigateByRole(data.role, navigate);
      } catch (error) {
        dispatch(authLoginFailedAction(error?.response?.data));
        showNotification(
          "error",
          error?.response?.data?.message || error?.response?.data
        );
      } finally {
        setIsLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [loginInputs, dispatch, navigate, redirectUrl]
  );

  return (
    <div className="component-login">
      <div className="cpn-login-left">
        <div>
          <h1>LAIBRUS</h1>
          <h2>The best resource for finding a book</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique,
            sapiente unde! Culpa odio id expedita non ad ut ipsum ipsa, corrupti
            nisi? Fuga expedita exercitationem soluta quas tempora unde rem?
          </p>
        </div>
        <img className="image-login-left" src={ImageLoginLeft} alt="" />
      </div>
      <div className="cpn-login-right">
        <form className="cpn-login-form" onSubmit={loginHandler}>
          <h1>Login</h1>
          <ul>
            <li>
              <UserOutlined style={{ color: "gray" }} />
              <input
                type="text"
                placeholder="Username"
                name="accountEmail"
                onChange={onInputChange}
              />
            </li>
            <li>
              <LockOutlined style={{ color: "gray" }} />
              <input
                type="password"
                placeholder="Password"
                name="accountPassword"
                onChange={onInputChange}
              />
            </li>
          </ul>
          <button disabled={isLoading} type="submit">
            Login
          </button>
          <div className="login-link">
            <Link to="/forgot">Forgot your password</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
