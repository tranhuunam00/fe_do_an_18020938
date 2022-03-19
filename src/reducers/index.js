import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";

const myReducer = combineReducers({
  modal: modalReducers,
});

export default myReducer;
