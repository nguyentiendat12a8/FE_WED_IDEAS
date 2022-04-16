import {
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_FAILED,
  USER_GET_LIST,
} from "../types";

const getUserListAction = (type) => ({
  type: USER_GET_LIST,
  payload: type,
});

const getUserListSuccessAction = (payload) => ({
  type: USER_GET_LIST_SUCCESS,
  payload,
});

const getUserListFailedAction = (payload) => ({
  type: USER_GET_LIST_FAILED,
  payload,
});

export { getUserListAction, getUserListFailedAction, getUserListSuccessAction };
