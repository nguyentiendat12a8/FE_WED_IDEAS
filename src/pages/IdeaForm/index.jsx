import React, { useState, useEffect } from "react";
import "./index.scss";
import Input from "../../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCategoryListAction,
  getDeparmentListAction,
  hideModalAction,
  showModalAction,
} from "../../store/actions";
import { createIdeaRequest } from "../../store/request";
import { showNotification } from "../../utils/messages";
import ModalForm from "../../components/common/ModalForm";

const IdeaForm = () => {
  const [ideaForm, setIdeaForm] = useState({
    categoryName: "",
    ideasContent: "",
  });
  const dispatch = useDispatch();
  const [dept, setDept] = useState("IT");
  const { category, department } = useSelector((state) => state.category);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [anonymous, setAnonymous] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dispatch(getCategoryListAction(dept));
    dispatch(getDeparmentListAction());
  }, [dispatch, dept]);

  useEffect(() => {
    if (category.list.length > 0) {
      setIdeaForm((prevState) => ({
        ...prevState,
        categoryName: category.list[0].categoryName,
      }));
    }
  }, [category]);

  const onChange = (e) =>
    e.target.name === "departmentName"
      ? setDept(e.target.value)
      : setIdeaForm((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("departmentName", dept);
    formData.append("ideasFile", file);
    formData.append("anonymous", anonymous);
    Object.keys(ideaForm).forEach((key) => formData.append(key, ideaForm[key]));
    setIsLoading(true);
    createIdeaRequest(formData)
      .then(() => {
        showNotification("success", "Created idea successfully");
        dispatch(hideModalAction());
        navigate("/staff/idea");
      })
      .catch((err) => {
        showNotification(
          "error",
          err?.response?.data?.message || err?.response?.data || err?.message
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="idea-form main-content-dashboard">
      <div>
        <Input
          value={dept}
          onChange={onChange}
          name="departmentName"
          label="Department Name"
          type="select"
        >
          {department.list.map((dep) => (
            <option key={dep._id} value={dep.departmentName}>
              {dep.departmentName}
            </option>
          ))}
        </Input>
        <Input
          value={ideaForm.categoryName}
          onChange={onChange}
          name="categoryName"
          label="Category Name"
          type="select"
        >
          {category.list.map((cate) => (
            <option key={cate._id} value={cate.categoryName}>
              {cate.categoryName}
            </option>
          ))}
        </Input>
        <Input
          value={ideaForm.ideasContent}
          onChange={onChange}
          name="ideasContent"
          label="Ideas Content"
          type="textarea"
        />
        <div className="input-container">
          <label className="label">Ideas file</label>
          <input className="input" onChange={onChangeFile} type="file" />
        </div>
        <div className="actions">
          <div>
            <label className="switch">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
              />
              <span className="slider round" />
            </label>
            <p>Anonymous</p>
          </div>
          <button
            type="button"
            className="btn"
            disabled={isLoading}
            onClick={() => dispatch(showModalAction())}
          >
            Add
          </button>
        </div>
      </div>
      <ModalForm
        title="Create New Idea"
        btnTitle="Save"
        onSubmit={onSubmit}
        isLoading={isLoading || !isChecked}
      >
        <div className="add-idea">
          <label className="label">
            <input
              type="checkbox"
              value={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>Đồng ý với điều khoản & dịch vụ</span>
          </label>
        </div>
      </ModalForm>
    </div>
  );
};

export default IdeaForm;
