import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: myReducer,
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
