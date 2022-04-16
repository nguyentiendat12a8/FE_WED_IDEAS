/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import notFound from "../../assets/img/404.png";
import "./styles/_404.scss";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { role } = useSelector((state) => state.auth);

  const [link, setLink] = useState("/");

  useEffect(() => {
    if (role === "admin") {
      setLink("/admin/home");
    }
    if (role === "staff") {
      setLink("/staff/home");
    }
    if (role === "QA") {
      setLink("/qa/home");
    }
  }, [role]);

  return (
    <div className="not-found">
      <img src={notFound} alt="" />
      <Link to={link}>
        <AiOutlineArrowLeft /> Quay lại trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
