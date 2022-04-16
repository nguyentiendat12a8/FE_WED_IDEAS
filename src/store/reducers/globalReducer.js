import {
  HIDE_SIDEBAR,
  SHOW_SIDEBAR,
  SHOW_MODAL,
  HIDE_MODAL,
  ROLE_GET_LIST,
  ROLE_GET_LIST_SUCCESS,
  ROLE_GET_LIST_FAILED,
} from "../types";

const initialState = {
  sidebar: {
    isShow: false,
  },
  modal: {
    isShow: false,
  },
  role: {
    list: [],
    isLoading: false,
    error: null,
  },
};

const globalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_SIDEBAR:
      return {
        ...state,
        sidebar: { isShow: true },
      };
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebar: { isShow: false },
      };
    case SHOW_MODAL:
      return {
        ...state,
        modal: { isShow: true },
      };
    case HIDE_MODAL:
      return {
        ...state,
        modal: { isShow: false },
      };
    case ROLE_GET_LIST:
      return {
        ...state,
        role: { ...state.role, isLoading: true, error: null },
      };
    case ROLE_GET_LIST_SUCCESS:
      return {
        ...state,
        role: { ...state.role, isLoading: false, list: payload },
      };
    case ROLE_GET_LIST_FAILED:
      return {
        ...state,
        role: { ...state.role, isLoading: false, error: payload },
      };
    default:
      return state;
  }
};

export default globalReducer;
