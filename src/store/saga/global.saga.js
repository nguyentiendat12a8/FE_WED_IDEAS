import { ROLE_GET_LIST } from "../types";
import { put, takeEvery } from "redux-saga/effects";
import { getRoleListRequest } from "../request";
import { getRoleListSuccessAction, getRoleListFailedAction } from "../actions";

export function* getRoleListSaga() {
  try {
    const { data } = yield getRoleListRequest();
    yield put(getRoleListSuccessAction(data.data));
  } catch (error) {
    yield put(getRoleListFailedAction(error));
  }
}

// Our watcher Saga:
export function* watchGlobal() {
  yield takeEvery(ROLE_GET_LIST, getRoleListSaga);
}
