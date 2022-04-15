import { call, put, takeLatest } from "redux-saga/effects";
import { productActions } from "./productSlice";
import * as productApi from "../../../api/product";
import toastService from "../../../service/toast";

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

function* handleCreateProduct(action) {
  try {
    const response = yield call(
      productApi.createProduct,
      action.payload.formData
    );
    console.log(action.payload);
    yield put(productActions.createProductSuccess({}));
    action.payload.navigate(`/shop/${action.payload.typeProduct}`);
    toastService(response);
  } catch (error) {
    toastService(error?.response);
    yield put(productActions.createProductFailed(error.response));
  }
}
export default function* productSaga() {
  yield takeLatest(productActions.getAllProduct.type, handleGetAllProduct);
  yield takeLatest(productActions.createProduct.type, handleCreateProduct);
}
