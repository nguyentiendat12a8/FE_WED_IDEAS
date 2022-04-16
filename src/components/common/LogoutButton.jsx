import React from "react";
import "./styles/logout-btn.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { authLogoutAction } from "../../store/actions";
import { useDispatch } from "react-redux";
import { iconFontSizeStyle } from "../../pages/IdeaDetail";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="logout-btn">
      <button
        className="btn btn-secondary btn-radius"
        onClick={() => {
          dispatch(authLogoutAction());
          navigate("/");
        }}
      >
        <strong>LOGOUT</strong> <LogoutOutlined style={iconFontSizeStyle} />
      </button>
    </div>
  );
};

export default LogoutButton;
