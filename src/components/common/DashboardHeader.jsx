import {
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSidebarAction, showSidebarAction } from "../../store/actions";
import Logo from "./Logo";
import "./styles/dashboardHeader.scss";
import SubMenu from "./SubMenu";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const { sidebar } = useSelector((state) => state.global);
  const { role, email } = useSelector((state) => state.auth);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const onHideMenu = () => setShowSubMenu(false);

  return (
    <header className="dashboard-header">
      <div className="logo-container">
        <div className="mock-div"></div>
        <Logo />
      </div>
      <nav className="nav">
        <ul className="links">
          <li className="f-14">{email}</li>
          <li>
            <UserOutlined style={{ fontSize: 24 }} />
          </li>
          <li className="position-relative">
            <SettingOutlined
              style={{
                fontSize: 24,
                cursor: "pointer",
              }}
              onClick={() => setShowSubMenu(!showSubMenu)}
            />
            <SubMenu show={showSubMenu} role={role} hideMenu={onHideMenu} />
          </li>
          <li className="toggler">
            {sidebar.isShow ? (
              <MenuFoldOutlined
                style={{ fontSize: 24, cursor: "pointer" }}
                onClick={() => dispatch(hideSidebarAction())}
              />
            ) : (
              <MenuUnfoldOutlined
                style={{ fontSize: 24, cursor: "pointer" }}
                onClick={() => dispatch(showSidebarAction())}
              />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default DashboardHeader;
