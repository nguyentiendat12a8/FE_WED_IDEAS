import React from "react";
import logoImg from "../../assets/img/logo.png";
import "./styles/logo.scss";

const Logo = () => {
  return (
    <div className="logo">
      <img src={logoImg} alt="" />
    </div>
  );
};

export default Logo;
