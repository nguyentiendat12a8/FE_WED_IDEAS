import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import {
  getDeparmentListAction,
  getClosureDateListAction,
} from "../../../store/actions";
import { createOrUpdateClosureDateRequest } from "../../../store/request";
import { showNotification } from "../../../utils/messages";
import "./index.scss";

const NewClosureDate = () => {
  const [closureDate, setClosureDate] = useState({
    departmentName: "IT",
    firstClosureDate: "",
    finalClosureDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { department } = useSelector((state) => state.category);
  const {
    closureDates: { list },
  } = useSelector((state) => state.closureDate);
  const dispatch = useDispatch();
  const { id } = useParams();
  const findedClosureDate = list.find((user) => user._id === id);

  useEffect(() => {
    dispatch(getDeparmentListAction());
    if (id) {
      dispatch(getClosureDateListAction());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (findedClosureDate) {
      setClosureDate(findedClosureDate);
    }
  }, [findedClosureDate]);

  const onChange = (e) =>
    setClosureDate({ ...closureDate, [e.target.name]: e.target.value });

  const createOrEditClosureDateHandler = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const { data } = await createOrUpdateClosureDateRequest(closureDate);
        showNotification("success", data?.message);
        navigate("/admin/closure-dates");
      } catch (error) {
        showNotification(
          "error",
          error?.response?.data?.message ||
            error?.response?.data ||
            error?.message ||
            error
        );
      } finally {
        setIsLoading(false);
      }
    },
    [closureDate, navigate]
  );

  return (
    <div className="closureDate-create main-content-dashboard">
      <h1 className="title">{id ? "Edit" : "Create"} closure date</h1>
      <form onSubmit={createOrEditClosureDateHandler}>
        <Input
          value={closureDate?.departmentName}
          type="select"
          onChange={onChange}
          name="departmentName"
          label="Department Name"
        >
          {department.list.map((d) => (
            <option key={d.departmentName} value={d.departmentName}>
              {d.departmentName}
            </option>
          ))}
        </Input>
        <Input
          value={closureDate?.firstClosureDate}
          label="First closure date"
          onChange={onChange}
          name="firstClosureDate"
          type="date"
        />
        <Input
          value={closureDate?.finalClosureDate}
          label="Final closure date "
          onChange={onChange}
          name="finalClosureDate"
          type="date"
        />
        <div className="actions">
          <button className="btn" type="submit" disabled={isLoading}>
            {id ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewClosureDate;
