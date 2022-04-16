import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_MODAL,
  HIDE_MODAL,
  ROLE_GET_LIST,
  ROLE_GET_LIST_SUCCESS,
  ROLE_GET_LIST_FAILED,
} from "../types";

const showSidebarAction = () => ({ type: SHOW_SIDEBAR });

const hideSidebarAction = () => ({ type: HIDE_SIDEBAR });

const showModalAction = () => ({ type: SHOW_MODAL });

const hideModalAction = () => ({ type: HIDE_MODAL });

const getRoleListAction = () => ({
  type: ROLE_GET_LIST,
});

const getRoleListSuccessAction = (payload) => ({
  type: ROLE_GET_LIST_SUCCESS,
  payload,
});

const getRoleListFailedAction = (payload) => ({
  type: ROLE_GET_LIST_FAILED,
  payload,
});

export {
  showSidebarAction,
  hideSidebarAction,
  showModalAction,
  hideModalAction,
  getRoleListAction,
  getRoleListSuccessAction,
  getRoleListFailedAction,
};
