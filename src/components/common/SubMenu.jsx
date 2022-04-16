import React from "react";
import { Link } from "react-router-dom";
import "./styles/submenu.scss";

const SubMenu = ({ role, show, hideMenu }) => {
  return (
    <ul className={`submenu ${show ? "show" : ""}`}>
      <li>
        <Link to={`/${role?.toLowerCase()}/password`} onClick={hideMenu}>
          Change password
        </Link>
      </li>
      <li>
        <Link to={`/${role?.toLowerCase()}/info`} onClick={hideMenu}>
          Change info
        </Link>
      </li>
    </ul>
  );
};

export default SubMenu;
