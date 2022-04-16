import { CLOSURE_DATE_GET_LIST } from "../types";
import { put, takeEvery } from "redux-saga/effects";
import { getClosureDateListRequest } from "../request";
import {
  getClosureDateListSuccessAction,
  getClosureDateListFailedAction,
} from "../actions";

export function* getClosureDateListSaga() {
  try {
    const { data } = yield getClosureDateListRequest();
    yield put(getClosureDateListSuccessAction(data.data));
  } catch (error) {
    yield put(getClosureDateListFailedAction(error));
  }
}

// Our watcher Saga:
export function* watchClosureDate() {
  yield takeEvery(CLOSURE_DATE_GET_LIST, getClosureDateListSaga);
}
