import {
  CLOSURE_DATE_GET_LIST_SUCCESS,
  CLOSURE_DATE_GET_LIST_FAILED,
  CLOSURE_DATE_GET_LIST,
} from "../types";

const getClosureDateListAction = () => ({
  type: CLOSURE_DATE_GET_LIST,
});

const getClosureDateListSuccessAction = (payload) => ({
  type: CLOSURE_DATE_GET_LIST_SUCCESS,
  payload,
});

const getClosureDateListFailedAction = (payload) => ({
  type: CLOSURE_DATE_GET_LIST_FAILED,
  payload,
});

export {
  getClosureDateListAction,
  getClosureDateListFailedAction,
  getClosureDateListSuccessAction,
};
