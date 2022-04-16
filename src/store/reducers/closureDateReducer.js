import {
  CLOSURE_DATE_GET_LIST,
  CLOSURE_DATE_GET_LIST_SUCCESS,
  CLOSURE_DATE_GET_LIST_FAILED,
} from "../types";
import produce from "immer";

const initialState = {
  closureDates: {
    list: [],
    isLoading: false,
    error: null,
  },
};

const closureDateReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case CLOSURE_DATE_GET_LIST:
        draft.closureDates.isLoading = true;
        draft.closureDates.error = null;
        break;
      case CLOSURE_DATE_GET_LIST_SUCCESS:
        draft.closureDates.list = payload;
        draft.closureDates.isLoading = false;
        break;
      case CLOSURE_DATE_GET_LIST_FAILED:
        draft.closureDates.error = payload;
        draft.closureDates.isLoading = false;
        break;
      default:
        break;
    }
  });
export default closureDateReducer;
