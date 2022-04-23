import { call, put, takeLatest } from "redux-saga/effects";
import { productActions } from "./productSlice";
import * as productApi from "../../../api/product";
import toastService from "../../../service/toast";

function* handleGetAllProduct(action) {
  try {
    let response;
    if (action.sallerId) {
      response = yield call(productApi.getAllProductBySallerId, action.payload);
    } else {
      response = yield call(productApi.getAllProducts, action.payload);
    }

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

    yield put(productActions.createProductSuccess({}));
    action.payload.navigate(`/shop/${action.payload.typeProduct}`);
    toastService(response);
  } catch (error) {
    toastService(error?.response);
    yield put(productActions.createProductFailed(error.response));
  }
}

function* handleGetDetailProduct(action) {
  try {
    const response = yield call(productApi.getDetailProductByProductId, {
      productId: action.payload.productId,
    });
    yield put(productActions.getDetailProductSuccess(response));
  } catch (error) {
    yield put(productActions.getDetailProductFailed(error.response));
  }
}

function* handleUpdateProduct(action) {
  try {
    const response = yield call(productApi.updateProduct, {
      productId: action.payload.productId,
      data: action.payload.data,
    });

    yield put(productActions.updateProductSuccess(response));
    yield put(productActions.updateFilterProduct(action.payload.filter));
    action.payload.navigate();
  } catch (error) {
    yield put(productActions.updateProductFailed(error.response));
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.getAllProduct.type, handleGetAllProduct);
  yield takeLatest(productActions.createProduct.type, handleCreateProduct);
  yield takeLatest(
    productActions.getDetailProduct.type,
    handleGetDetailProduct
  );
  yield takeLatest(productActions.updateProduct.type, handleUpdateProduct);
}
