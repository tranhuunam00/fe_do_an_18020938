import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";
import authReducers from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
const myReducer = combineReducers({
  modal: modalReducers,
  products: productReducer,
  carts: cartReducer,
});

export default myReducer;
