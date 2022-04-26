import { call, put, takeLatest } from "redux-saga/effects";
import { cartActions } from "./cartSlice";
import { modalActions } from "../modal/modalSlice";
import * as customerApi from "../../../api/customer";
import * as productApi from "../../../api/product";
import toastService from "../../../service/toast";

function* handleCreateCart(action) {
  try {
    const { product, amount } = action.payload;
    const response = yield call(customerApi.createCart, { product, amount });

    yield put(cartActions.createCartSuccess({}));
    yield put(modalActions.hideModal({}));
    if (response) {
      action.payload.navigate("/cart");
    }
  } catch (error) {
    yield put(cartActions.createCartFailed(error.response));
    toastService(error.response);
  }
}

function* handleGetCart(action) {
  try {
    const response = yield call(customerApi.getCart, action.payload);
    yield put(cartActions.getCartSuccess(response.data.data));
  } catch (error) {
    yield put(cartActions.getCartFailed(error.response));
  }
}

function* handleUpdateCart(action) {
  try {
    const { _idCart, product, amount, newCurrentCarts } = action.payload;
    const response = yield call(customerApi.updateCart, {
      _idCart,
      product,
      amount,
    });
    yield put(cartActions.updateCartSuccess(newCurrentCarts));
  } catch (error) {
    toastService(error.response);
    yield put(cartActions.updateCartFailed(error.response));
  }
}

function* deleteUpdateCart(action) {
  try {
    const { _idCart, newCurrentCarts, newSelectCarts } = action.payload;
    const response = yield call(customerApi.deleteCart, {
      _idCart,
    });
    yield put(
      cartActions.deleteCartSuccess({ newCurrentCarts, deleteCart: _idCart })
    );
  } catch (error) {
    yield put(cartActions.deleteCartFailed(error.response));
  }
}
export default function* cartSaga() {
  yield takeLatest(cartActions.createCart.type, handleCreateCart);
  yield takeLatest(cartActions.getCart.type, handleGetCart);
  yield takeLatest(cartActions.updateCart.type, handleUpdateCart);
  yield takeLatest(cartActions.deleteCart.type, deleteUpdateCart);
}
