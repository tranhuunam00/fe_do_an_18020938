import { combineReducers } from "redux";
import modalReducers from "../features/modal/modalSlice";
import authReducers from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import dialogReducer from "../features/dialog/dialogSlice";
const myReducer = combineReducers({
  modal: modalReducers,
  products: productReducer,
  carts: cartReducer,
  orders: orderReducer,
  dialog: dialogReducer,
});

export default myReducer;
