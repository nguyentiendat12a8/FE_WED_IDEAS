import React from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAction } from "../../store/actions";
import Logo from "../common/Logo";

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <Logo />
      <nav className="nav">
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        {token ? (
          <div className="actions">
            <button
              className="btn"
              onClick={() => dispatch(authLogoutAction())}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="actions">
            <Link to="/login" className="btn btn-outlined">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
