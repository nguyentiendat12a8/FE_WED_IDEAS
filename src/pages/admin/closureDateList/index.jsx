import React, { useEffect } from "react";
import BaseListHeader from "../../../components/BaseListHeader";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import { getClosureDateListAction } from "../../../store/actions";
import { useNavigate } from "react-router-dom";
import ClosureDateDataList from "../../../components/admin/ClosureDateDataList";

const ClosureDateList = () => {
  const dispatch = useDispatch();
  const { closureDates } = useSelector((state) => state.closureDate);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClosureDateListAction());
  }, [dispatch]);

  return (
    <div className="user-list main-content-dashboard">
      <h1 className="title">All closure date</h1>
      <BaseListHeader
        hideSearch
        btnTile="Add closure date"
        dispatchAction={() => navigate("/admin/closure-dates/new")}
      />
      <ClosureDateDataList
        list={closureDates.list}
        isLoading={closureDates.isLoading}
        onNavigate={(id) => navigate(`/admin/closure-dates/${id}`)}
      />
    </div>
  );
};

export default ClosureDateList;
