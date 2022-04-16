import {
  IDEA_GET_LIST,
  IDEA_GET_LIST_FAILED,
  IDEA_GET_LIST_SUCCESS,
  IDEA_GET_DETAIL_SUCCESS,
  IDEA_GET_DETAIL_FAILED,
  IDEA_GET_DETAIL,
} from "../types";

const getIdeaListAction = (filter = "", isStaff = false) => ({
  type: IDEA_GET_LIST,
  filter,
  isStaff,
});

const getIdeaListSuccessAction = (payload) => ({
  type: IDEA_GET_LIST_SUCCESS,
  payload,
});

const getIdeaListFailedAction = (payload) => ({
  type: IDEA_GET_LIST_FAILED,
  payload,
});

const getIdeaDetailAction = (ideaId) => ({
  type: IDEA_GET_DETAIL,
  ideaId,
});

const getIdeaDetailSuccessAction = (payload) => ({
  type: IDEA_GET_DETAIL_SUCCESS,
  payload,
});

const getIdeaDetailFailedAction = (payload) => ({
  type: IDEA_GET_DETAIL_FAILED,
  payload,
});

export {
  getIdeaListAction,
  getIdeaListSuccessAction,
  getIdeaListFailedAction,
  getIdeaDetailAction,
  getIdeaDetailFailedAction,
  getIdeaDetailSuccessAction,
};
