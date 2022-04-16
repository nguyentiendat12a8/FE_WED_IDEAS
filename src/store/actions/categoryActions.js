import {
  DEPARTMENT_GET_LIST,
  DEPARTMENT_GET_LIST_FAILED,
  DEPARTMENT_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_FAILED,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_CREATE,
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_FROM_STATE,
} from "../types";

const getDeparmentListAction = () => ({
  type: DEPARTMENT_GET_LIST,
});

const getDeparmentListSuccessAction = (payload) => ({
  type: DEPARTMENT_GET_LIST_SUCCESS,
  payload,
});

const getDeparmentListFailedAction = (payload) => ({
  type: DEPARTMENT_GET_LIST_FAILED,
  payload,
});

const getCategoryListAction = (dept) => ({
  type: CATEGORY_GET_LIST,
  dept,
});

const getCategoryListSuccessAction = (payload) => ({
  type: CATEGORY_GET_LIST_SUCCESS,
  payload,
});

const getCategoryListFailedAction = (payload) => ({
  type: CATEGORY_GET_LIST_FAILED,
  payload,
});

const createCategoryAction = (formData) => ({
  type: CATEGORY_CREATE,
  formData,
});

const createCategorySuccessAction = (payload) => ({
  type: CATEGORY_CREATE_SUCCESS,
  payload,
});

const createCategoryFailedAction = (payload) => ({
  type: CATEGORY_CREATE_FAILED,
  payload,
});

const deleteCategoryAction = (id) => ({
  type: CATEGORY_DELETE,
  id,
});

const deleteCategorySuccessAction = (payload) => ({
  type: CATEGORY_DELETE_SUCCESS,
  payload,
});

const deleteCategoryFailedAction = (payload) => ({
  type: CATEGORY_DELETE_FAILED,
  payload,
});

const deleteCategoryFromStateAction = (payload) => ({
  type: CATEGORY_DELETE_FROM_STATE,
  payload,
});

export {
  getDeparmentListAction,
  getDeparmentListSuccessAction,
  getDeparmentListFailedAction,
  getCategoryListAction,
  getCategoryListSuccessAction,
  getCategoryListFailedAction,
  createCategoryAction,
  createCategorySuccessAction,
  createCategoryFailedAction,
  deleteCategoryAction,
  deleteCategoryFailedAction,
  deleteCategorySuccessAction,
  deleteCategoryFromStateAction,
};
