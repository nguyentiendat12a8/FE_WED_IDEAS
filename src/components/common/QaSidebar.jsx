import {
  FolderOutlined,
  HomeOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { hideSidebarAction } from "../../store/actions";
import LogoutButton from "./LogoutButton";
import "./styles/qaSidebar.scss";

const QaSidebar = () => {
  const { sidebar } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  return (
    <aside
      className={[
        "qa-sidebar fixed-sidebar",
        sidebar.isShow ? "show" : "",
      ].join(" ")}
    >
      <ul>
        <li>
          <NavLink to="/qa/home" onClick={() => dispatch(hideSidebarAction())}>
            <span>Home Page</span>
            <HomeOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/qa/dashboard"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span>DashBoard</span>
            <LayoutOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/qa/category"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span> Category management</span>
            <FolderOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
      </ul>
      <LogoutButton />
    </aside>
  );
};

export default QaSidebar;
