import { USER_GET_LIST } from "../types";
import { put, takeEvery } from "redux-saga/effects";
import { getUserListRequest } from "../request";
import { getUserListSuccessAction, getUserListFailedAction } from "../actions";

export function* getUserListSaga(action) {
  try {
    const { data } = yield getUserListRequest(action.payload);
    yield put(getUserListSuccessAction(data.data));
  } catch (error) {
    yield put(getUserListFailedAction(error));
  }
}

// Our watcher Saga:
export function* watchUser() {
  yield takeEvery(USER_GET_LIST, getUserListSaga);
}
