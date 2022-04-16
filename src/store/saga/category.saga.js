import {
  DEPARTMENT_GET_LIST,
  CATEGORY_GET_LIST,
  CATEGORY_CREATE,
  CATEGORY_DELETE,
} from "../types";
import { put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  getDeparmentListRequest,
  getCategoryListRequest,
  createCategoryRequest,
  deleteCategoryRequest,
} from "../request";
import {
  getDeparmentListFailedAction,
  getDeparmentListSuccessAction,
  getCategoryListSuccessAction,
  getCategoryListFailedAction,
  createCategorySuccessAction,
  createCategoryFailedAction,
  hideModalAction,
  deleteCategorySuccessAction,
  deleteCategoryFailedAction,
  deleteCategoryFromStateAction,
} from "../actions";
import { showNotification } from "../../utils/messages";

export function* getDepartmentListSaga(action) {
  try {
    const { data } = yield getDeparmentListRequest();
    yield put(getDeparmentListSuccessAction(data.data));
  } catch (error) {
    yield put(getDeparmentListFailedAction(error));
  }
}

export function* getCategoryListSaga(action) {
  try {
    const { data } = yield getCategoryListRequest(action.dept);
    yield put(getCategoryListSuccessAction(data.data));
  } catch (error) {
    yield put(getCategoryListFailedAction(error));
  }
}

export function* createCategorySaga(action) {
  try {
    const { data } = yield createCategoryRequest(action.formData);
    yield put(createCategorySuccessAction(data.data));
  } catch (error) {
    showNotification(
      "error",
      error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        error
    );
    yield put(createCategoryFailedAction(error));
  } finally {
    yield put(hideModalAction());
  }
}

export function* deleteCategorySaga(action) {
  try {
    const { data } = yield deleteCategoryRequest(action.id);
    yield put(deleteCategorySuccessAction(data));
    showNotification("success", data.message);
    yield put(deleteCategoryFromStateAction(action.id));
  } catch (error) {
    showNotification(
      "error",
      error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        error
    );
    yield put(deleteCategoryFailedAction(error));
  }
}

// Our watcher Saga:
export function* watchCategory() {
  yield takeEvery(CATEGORY_GET_LIST, getCategoryListSaga);
  yield takeEvery(DEPARTMENT_GET_LIST, getDepartmentListSaga);
  yield takeLatest(CATEGORY_CREATE, createCategorySaga);
  yield takeLatest(CATEGORY_DELETE, deleteCategorySaga);
}
