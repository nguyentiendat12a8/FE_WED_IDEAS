import "./index.scss";
import ImageLoginLeft from "../../image/loginLeft.png";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { authSignupRequest } from "../../store/request";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [signupInputs, setLoginInputs] = useState({
    accountEmail: "",
    accountPassword: "",
  });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setLoginInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await authSignupRequest(signupInputs);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signupInputs]);

  return (
    <div className="component-signup">
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
        <div className="cpn-login-form">
          <h1>Sign up for a free account</h1>
          <ul>
            <li>
              <input
                type="text"
                placeholder="Email address"
                name="accountEmail"
                onChange={onInputChange}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="Create Password"
                name="accountPassword"
                onChange={onInputChange}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                onChange={onInputChange}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Address"
                name="address"
                onChange={onInputChange}
              />
            </li>
            <li>
              <label>Gender</label>
              <select name="gender" onChange={onInputChange}>
                <option value="nam">Female</option>
                <option value="nu">Male</option>
                <option value="">Other</option>
              </select>
            </li>
            <li>
              <label>Role Name</label>
              <select name="roleName" onChange={onInputChange}>
                <option value="admin">Admin</option>
                <option value="QA of IT">QA of IT</option>
                <option value="QA of business">QA of business</option>
                <option value="QA of graphic design">
                  QA of graphic design
                </option>
                <option value="staff">Staff</option>
              </select>
            </li>
          </ul>
          <button disabled={isLoading} onClick={loginHandler}>
            Register
          </button>
          <div className="login-link">
            <Link to="/forgot">Forgot your password</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
