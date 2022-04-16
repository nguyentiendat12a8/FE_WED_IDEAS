import { IDEA_GET_LIST, IDEA_GET_DETAIL } from "../types";
import { put, takeEvery } from "redux-saga/effects";
import {
  getIdeaListRequest,
  getIdeaDetailRequest,
  filterIdeaListRequest,
} from "../request";
import {
  getIdeaListFailedAction,
  getIdeaListSuccessAction,
  getIdeaDetailFailedAction,
  getIdeaDetailSuccessAction,
} from "../actions";

export function* getIdeaListSaga(action) {
  try {
    const { data } = yield action.filter
      ? filterIdeaListRequest(action.filter)
      : getIdeaListRequest(action.isStaff);
    yield put(getIdeaListSuccessAction(data.data));
  } catch (error) {
    yield put(getIdeaListFailedAction(error));
  }
}

export function* getIdeaDetailSaga(action) {
  try {
    const { data } = yield getIdeaDetailRequest(action.ideaId);
    yield put(getIdeaDetailSuccessAction(data.data));
  } catch (error) {
    yield put(getIdeaDetailFailedAction(error));
  }
}

// Our watcher Saga:
export function* watchIdea() {
  yield takeEvery(IDEA_GET_LIST, getIdeaListSaga);
  yield takeEvery(IDEA_GET_DETAIL, getIdeaDetailSaga);
}
