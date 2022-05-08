import { call, put, takeLatest } from "redux-saga/effects";
import { orderActions } from "./orderSlice";
import { modalActions } from "../modal/modalSlice";
import { dialogActions } from "../dialog/dialogSlice";

import * as orderApis from "../../../api/order";
import toastService from "../../../service/toast";
import queryString from "query-string";

function* handleCreateOrder(action) {
  try {
    const { navigate, ...data } = action.payload;
    const response = yield call(orderApis.createOrder, data);

    yield put(orderActions.createOrderSuccess({}));
    const query = queryString.stringify({
      title: "Thanh toán",
      message: "Vui lòng quét mã đã thanh toán ",
      textButton: "Trang chủ",
      link: "/",
    });
    if (response && response.data && response.data.data) {
      window.open(response.data.data);
    } else {
    }
    navigate("/notify?" + query);
  } catch (error) {
    toastService(error.response);
    yield put(orderActions.createOrderFailed(error.response));
  }
}

function* handlegetAllOrders(action) {
  try {
    const response = yield call(orderApis.getAllOrder, action?.payload);
    yield put(orderActions.getAllOrderSuccess(response.data.data));
  } catch (error) {
    toastService(error.response);
    yield put(orderActions.getAllOrderFailed(error.response));
  }
}

function* handleUpdateOrders(action) {
  try {
    console.log(action);
    const { orderId, data, newCurrentOrders, newOrder } = action.payload;
    console.log(newCurrentOrders);
    const response = yield call(orderApis.updateOrder, { orderId, data });
    console.log(response);
    yield put(orderActions.updateOrderSuccess());
    yield put(orderActions.updateCurrentOrders(newCurrentOrders));
    yield put(modalActions.changeValueState(newOrder));
    yield put(dialogActions.setHideModal());
    toastService(response);
  } catch (error) {
    console.log(error.response);
    toastService(error.response);
    yield put(orderActions.updateOrderFailed(error.response));
  }
}
export default function* orderSaga() {
  yield takeLatest(orderActions.createOrder.type, handleCreateOrder);
  yield takeLatest(orderActions.getAllOrder.type, handlegetAllOrders);
  yield takeLatest(orderActions.updateOrder.type, handleUpdateOrders);
}
