import React from "react";
import { Link } from "react-router-dom";
import "./styles/submenu.scss";

const SubMenu = ({ role, show, hideMenu }) => {
  const renderRoleLink = () => {
    switch(role) {
      case "QA of business":
      case "QA of IT":
      case "QA of graphic design":
        return 'qac';
      default:
      return role?.toLowerCase();
    }
  }
  return (
    <ul className={`submenu ${show ? "show" : ""}`}>
      <li>
        <Link to={`/${renderRoleLink(role)}/password`} onClick={hideMenu}>
          Change password
        </Link>
      </li>
      <li>
        <Link to={`/${renderRoleLink(role)}/info`} onClick={hideMenu}>
          Change info
        </Link>
      </li>
    </ul>
  );
};

export default SubMenu;
