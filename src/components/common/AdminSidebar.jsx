import {
  HomeOutlined,
  UsergroupAddOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { hideSidebarAction } from "../../store/actions";
import LogoutButton from "./LogoutButton";
import "./styles/qaSidebar.scss";

const AdminSidebar = () => {
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
          <NavLink
            to="/admin/home"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span>Home Page</span>
            <HomeOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span> Users managent</span>
            <UsergroupAddOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/closure-dates"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span> Closure Date managent</span>
            <CalendarOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
      </ul>
      <LogoutButton />
    </aside>
  );
};

export default AdminSidebar;
