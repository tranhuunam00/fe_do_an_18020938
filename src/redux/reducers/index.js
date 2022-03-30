import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";
import authReducers from "../features/auth/authSlice";
const myReducer = combineReducers({
  modal: modalReducers,
  auth:authReducers

});

export default myReducer;
