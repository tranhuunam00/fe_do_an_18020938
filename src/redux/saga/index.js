import { all } from "redux-saga/effects";
import productSaga from "../features/product/productSaga";
import cartSaga from "../features/cart/cartSaga";
import orderSaga from "../features/order/orderSaga";
export default function* rootSaga() {
  yield all([productSaga(), cartSaga(), orderSaga()]);
}
