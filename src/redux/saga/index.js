import { all } from "redux-saga/effects";
import productSaga from "../features/product/productSaga";
import cartSaga from "../features/cart/cartSaga";
export default function* rootSaga() {
  yield all([productSaga(), cartSaga()]);
}
