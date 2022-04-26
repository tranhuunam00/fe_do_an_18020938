import { call, put, takeLatest } from "redux-saga/effects";
import { orderActions } from "./orderSlice";
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

export default function* orderSaga() {
  yield takeLatest(orderActions.createOrder.type, handleCreateOrder);
}
