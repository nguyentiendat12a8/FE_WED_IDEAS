import {
  IDEA_GET_LIST,
  IDEA_GET_LIST_SUCCESS,
  IDEA_GET_LIST_FAILED,
  IDEA_GET_DETAIL,
  IDEA_GET_DETAIL_SUCCESS,
  IDEA_GET_DETAIL_FAILED,
} from "../types";
import produce from "immer";

const initialState = {
  ideas: {
    list: [],
    isLoading: false,
    error: null,
  },
  detail: {
    isLoading: false,
    error: null,
    data: null,
  },
};

const ideaReducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case IDEA_GET_LIST:
        draft.ideas.isLoading = true;
        draft.ideas.error = null;
        break;
      case IDEA_GET_LIST_SUCCESS:
        draft.ideas.list = payload;
        draft.ideas.isLoading = false;
        break;
      case IDEA_GET_LIST_FAILED:
        draft.ideas.error = payload;
        draft.ideas.isLoading = false;
        break;
      case IDEA_GET_DETAIL:
        draft.detail.isLoading = true;
        draft.detail.error = null;
        break;
      case IDEA_GET_DETAIL_SUCCESS:
        draft.detail.data = payload;
        draft.detail.isLoading = false;
        break;
      case IDEA_GET_DETAIL_FAILED:
        draft.detail.error = payload;
        draft.detail.isLoading = false;
        break;
      default:
        break;
    }
  });
export default ideaReducer;
