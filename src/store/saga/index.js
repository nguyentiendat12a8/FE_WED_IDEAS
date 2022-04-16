import { watchCategory } from "./category.saga";
import { all } from "redux-saga/effects";
import { watchIdea } from "./idea.saga";
import { watchUser } from "./user.saga";
import { watchGlobal } from "./global.saga";
import { watchClosureDate } from "./closure-date.saga";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchCategory(),
    watchIdea(),
    watchUser(),
    watchGlobal(),
    watchClosureDate(),
    /*, another saga here*/
  ]);
}
