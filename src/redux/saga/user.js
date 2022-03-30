import { push } from "connected-react-router";
import { call, put, takeLatest } from "redux-saga/effects";
import authApi from "../../api/auth";
import { routes } from "../../utils/constants";
import { StorageConstants, UserRoles } from "../../utils/enum";
import { setHeadersAuthorization } from "../../utils/help";
import { authActions } from "./authSlice";

function* handleLogin(action) {
  try {
    const resp = yield call(authApi.login, action.payload);
    const data = resp.data.data;
    const accessToken = data.token;
    const role = data.user.role;

    localStorage.setItem(StorageConstants.ACCESS_TOKEN, accessToken);
    localStorage.setItem(StorageConstants.USER, JSON.stringify(data.user));

    if (role === UserRoles.ADMIN) {
      yield put(authActions.loginSuccess(resp));
      yield put(push(routes.ADMIN));
    } else if (role === UserRoles.STUDENT) {
      yield put(authActions.loginSuccess(resp));
      yield put(push(routes.STUDENT));
    } else if (role === UserRoles.TUTOR) {
      yield put(authActions.loginSuccess(resp));
      yield put(push(routes.TUTOR_SCHEDULE));
    } else if (role === UserRoles.CUSTOMER_SERVICE) {
      yield put(authActions.loginSuccess(resp));
      yield put(push(routes.CUSTOMER_SERVICE));
    }
  } catch (error) {
    yield put(authActions.loginFailed(error.response));
  }
}

function* handleLogout() {
  window.localStorage.clear();
  setHeadersAuthorization("");
  yield put(push(routes.AUTH));
}

//register student
function* handleRegister(action) {
  try {
    const response = yield call(authApi.register, action.payload);
    yield put(authActions.registerSuccess(response));
  } catch (error) {
    yield put(authActions.registerFailed(error.response));
  }
}

//reset password student
function* handleSendMail(action) {
  try {
    const response = yield call(authApi.sendMail, action.payload);
    yield put(authActions.sendMailSuccess(response));
  } catch (error) {
    yield put(authActions.sendMailFailed(error.response));
  }
}

function* handleResetPassword(action) {
  try {
    const response = yield call(authApi.resetPassword, action.payload);
    yield put(authActions.resetPasswordSuccess(response));
  } catch (error) {
    yield put(authActions.resetPasswordFailed(error.response));
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.logout.type, handleLogout);
  yield takeLatest(authActions.register.type, handleRegister);
  yield takeLatest(authActions.sendMail.type, handleSendMail);
  yield takeLatest(authActions.resetPassword.type, handleResetPassword);
}
