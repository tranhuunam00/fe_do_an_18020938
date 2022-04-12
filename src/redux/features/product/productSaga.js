import { call, put, takeLatest } from "redux-saga/effects";
import { productActions } from "./productSlice";
import * as productApi from "../../../api/product";

function* handleGetAllProduct(action) {
  try {
    const response = yield call(productApi.getAllProduct, action.payload);
    yield put(
      productActions.getAllProductSuccess({
        response,
        type: action.payload.query._typeProduct,
      })
    );
  } catch (error) {
    yield put(productActions.getAllProductFailed(error.response));
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.getAllProduct.type, handleGetAllProduct);
}
