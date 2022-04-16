import {
  USER_GET_LIST,
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_FAILED,
} from "../types";
import produce from "immer";

const initialState = {
  users: {
    list: [],
    isLoading: false,
    error: null,
  },
};

const userReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case USER_GET_LIST:
        draft.users.isLoading = true;
        draft.users.error = null;
        break;
      case USER_GET_LIST_SUCCESS:
        draft.users.list = payload;
        draft.users.isLoading = false;
        break;
      case USER_GET_LIST_FAILED:
        draft.users.error = payload;
        draft.users.isLoading = false;
        break;
      default:
        break;
    }
  });
export default userReducer;
