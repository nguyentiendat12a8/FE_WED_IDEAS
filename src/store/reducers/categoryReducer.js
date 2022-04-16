import {
  DEPARTMENT_GET_LIST,
  DEPARTMENT_GET_LIST_SUCCESS,
  DEPARTMENT_GET_LIST_FAILED,
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST_FAILED,
  CATEGORY_CREATE,
  CATEGORY_CREATE_FAILED,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE,
  CATEGORY_DELETE_FAILED,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FROM_STATE,
  HIDE_MODAL,
} from "../types";
import produce from "immer";

const initialState = {
  department: {
    list: [],
    isLoading: false,
    error: null,
  },
  category: {
    list: [],
    isLoading: false,
    error: null,
  },
  createState: {
    isLoading: false,
    error: null,
    success: false,
  },
  deleteState: {
    isLoading: false,
    error: null,
    success: false,
  },
};

const categoryReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case DEPARTMENT_GET_LIST:
        draft.department.isLoading = true;
        draft.department.error = null;
        break;
      case DEPARTMENT_GET_LIST_SUCCESS:
        draft.department.list = payload;
        draft.department.isLoading = false;
        break;
      case DEPARTMENT_GET_LIST_FAILED:
        draft.department.error = payload;
        draft.department.isLoading = false;
        break;
      case CATEGORY_GET_LIST:
        draft.category.isLoading = true;
        draft.category.error = null;
        break;
      case CATEGORY_GET_LIST_SUCCESS:
        draft.category.list = payload;
        draft.category.isLoading = false;
        break;
      case CATEGORY_GET_LIST_FAILED:
        draft.category.error = payload;
        draft.category.isLoading = false;
        break;
      case CATEGORY_CREATE:
        draft.createState.isLoading = true;
        draft.createState.error = null;
        break;
      case CATEGORY_CREATE_SUCCESS:
        draft.createState.success = true;
        draft.createState.isLoading = false;
        break;
      case CATEGORY_CREATE_FAILED:
        draft.createState.error = payload;
        draft.createState.isLoading = false;
        break;
      case CATEGORY_DELETE:
        draft.deleteState.isLoading = true;
        draft.deleteState.error = null;
        break;
      case CATEGORY_DELETE_SUCCESS:
        draft.deleteState.success = true;
        draft.deleteState.isLoading = false;
        break;
      case CATEGORY_DELETE_FAILED:
        draft.deleteState.error = payload;
        draft.deleteState.isLoading = false;
        break;
      case CATEGORY_DELETE_FROM_STATE:
        draft.category.list = draft.category.list.filter(
          (c) => c._id !== payload
        );
        draft.deleteState.success = false;
        break;
      case HIDE_MODAL:
        draft.createState.success = false;
        draft.deleteState.success = false;
        break;
      default:
        break;
    }
  });
export default categoryReducer;
