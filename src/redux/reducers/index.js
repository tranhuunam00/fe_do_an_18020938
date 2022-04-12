import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";
import authReducers from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
const myReducer = combineReducers({
  modal: modalReducers,
  products: productReducer,
});

export default myReducer;
