import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";
import couterReducers from "../features/counter/counterSlice";

const myReducer = combineReducers({
  modal: modalReducers,
  counter: couterReducers,
});

export default myReducer;
