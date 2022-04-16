import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducer from "./reducers/globalReducer";
import categoryReducer from "./reducers/categoryReducer";
import authReducer from "./reducers/authReducer";
import ideaReducer from "./reducers/ideaReducer";
import rootSaga from "./saga";
import createSagaMiddleware from "redux-saga";
import userReducer from "./reducers/userReducer";
import closureDateReducer from "./reducers/closureDateReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  category: categoryReducer,
  idea: ideaReducer,
  user: userReducer,
  closureDate: closureDateReducer,
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
