import { AreaChartOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import BaseListHeader from "../../components/BaseListHeader";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoryListAction,
  getDeparmentListAction,
  hideModalAction,
  showModalAction,
} from "../../store/actions";
import CategoryList from "../../components/common/CategoryList";
import ModalForm from "../../components/common/ModalForm";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";
import { showNotification } from "../../utils/messages";

const Category = () => {
  const dispatch = useDispatch();
  const {
    department: { list },
    category,
    createState,
    deleteState,
  } = useSelector((state) => state.category);
  const [selectedDept, setSelectedDept] = useState("IT");
  const [categoryForm, setCategoryForm] = useState({
    departmentName: "",
    categoryName: "",
  });
  const [deleteCategoryId, setDeleteCategoryId] = useState("");

  useEffect(() => {
    dispatch(getDeparmentListAction());
  }, [dispatch]);

  useEffect(() => {
    if (selectedDept || createState.success || deleteState.success) {
      dispatch(getCategoryListAction(selectedDept));
      dispatch(hideModalAction());
      setDeleteCategoryId("");
    }
    if (createState.error) {
      showNotification(
        "error",
        createState.error?.message || createState.error
      );
    }
  }, [
    selectedDept,
    dispatch,
    createState.success,
    createState.error,
    deleteState.success,
  ]);

  const listDeptMarkup = useMemo(
    () =>
      list.map((dept) => (
        <option key={dept._id} value={dept.departmentName}>
          {dept.departmentName}
        </option>
      )),
    [list]
  );

  const onChange = (e) =>
    setCategoryForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = () => dispatch(createCategoryAction(categoryForm));

  const onEditCategory = (editCategory) => {
    setCategoryForm(editCategory);
    dispatch(showModalAction());
  };

  const onDeleteCategory = (id) => {
    setDeleteCategoryId(id);
    dispatch(showModalAction());
  };

  const onConfirmDelete = () =>
    dispatch(deleteCategoryAction(deleteCategoryId));

  return (
    <section
      className={`category main-content-dashboard ${
        deleteState.isLoading ? "divDisable" : ""
      }`}
    >
      <h1 className="title">
        <AreaChartOutlined />
        <span>Category</span>
      </h1>
      <BaseListHeader
        btnTile="Add Category"
        dispatchAction={() => {
          dispatch(showModalAction());
          setCategoryForm({
            departmentName: "IT",
            categoryName: "",
          });
        }}
        hideSearch
      />
      <Input
        type="select"
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
      >
        {listDeptMarkup}
      </Input>
      {category.isLoading ? (
        <Loader />
      ) : (
        <CategoryList
          list={category.list}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
        />
      )}
      <ModalForm
        title={deleteCategoryId ? "Delete Category" : "Add Category"}
        btnTitle={deleteCategoryId ? "Confirm" : "Save"}
        onSubmit={deleteCategoryId ? onConfirmDelete : onSubmit}
        isLoading={createState.isLoading}
        closeAction={() => setDeleteCategoryId("")}
        btnCancelTitle={deleteCategoryId ? "Cancel" : ""}
      >
        <div className="add-category">
          {deleteCategoryId ? (
            <p>Are you sure delete this category ?</p>
          ) : (
            <>
              <Input
                type="select"
                value={categoryForm.departmentName}
                onChange={onChange}
                name="departmentName"
                label="Departmnet Name"
              >
                {listDeptMarkup}
              </Input>
              <Input
                value={categoryForm.categoryName}
                onChange={onChange}
                name="categoryName"
                label="Category Name"
              />
            </>
          )}
        </div>
      </ModalForm>
    </section>
  );
};

export default Category;
