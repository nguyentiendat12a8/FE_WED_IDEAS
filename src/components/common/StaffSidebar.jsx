import { HomeOutlined, BulbOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { hideSidebarAction } from "../../store/actions";
import LogoutButton from "./LogoutButton";
import "./styles/qaSidebar.scss";

const StaffSidebar = () => {
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
            to="/staff/home"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span>Home Page</span>
            <HomeOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/staff/idea"
            onClick={() => dispatch(hideSidebarAction())}
          >
            <span>My idea</span>
            <BulbOutlined style={{ fontSize: 24 }} />
          </NavLink>
        </li>
      </ul>
      <LogoutButton />
    </aside>
  );
};

export default StaffSidebar;
