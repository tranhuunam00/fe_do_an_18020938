import "./App.css";

import HomeNoLogin from "./pages/no_login/index";
import socketClient from "socket.io-client";

import UserContext from "./context_api/user/context";
import SocketContext from "./context_api/socketIo/context";
import * as enums from "./constants/enums";
import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Register from "./pages/no_login/register";
import Login from "./pages/no_login/login";
import ForgotPassword from "./pages/no_login/forgotPasword";
import Loading from "./commoms/loading/index";
import Notify from "./pages/no_login/notify";
import ResetPassword from "./pages/no_login/resetPassword";
import NotifyPush from "./pages/has_login/notificationPush";
import Profile from "./pages/has_login/profile/index";
import Store from "./pages/customer/store";
import Shop from "./pages/has_login/shop/index";
import ShopDetail from "./pages/has_login/shopDetail/index";
import Modal from "./commoms/modal/index";
import AddProduct from "./pages/saller/addProduct/index";
import Cart from "./pages/customer/cart/index";
import PaymentSreen from "./pages/customer/payment/index";

import { selectorShowModal } from "./redux/features/modal/modalSlice";
import { selectIsLoadingProduct } from "./redux/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import ReactGA from "react-ga";

const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-000000-01");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [location]);
};
function App() {
  usePageView();
  const isS = useSelector(selectorShowModal);
  const isL = useSelector(selectIsLoadingProduct);
  const [userState] = useContext(UserContext);
  const [socketState, setSocketIo] = useContext(SocketContext);

  useEffect(() => {
    if (userState.user.firstName) {
      var socket = socketClient(
        process.env.REACT_APP_API_ENDPOIND ||
          "https://tranhuunam18020938-do-an.herokuapp.com"
      );
      socket.on("connected", (data) => {
        if (data === "connected") {
          setSocketIo(socket);
        }
      });
      socket.on("return", (data) => {
        toast.info(data);
      });
    }
    return () => {
      if (!!socketState) {
        socketState.emit("disconnected", "out");
      }
    };
  }, [userState.user.firstName]);

  useEffect(() => {
    function checkUserData() {}
    window.addEventListener("storage ", checkUserData);
    return () => {
      window.removeEventListener("storage ", checkUserData);
    };
  }, []);

  const routerFromRole = (role) => {
    let route = (
      <>
        <Route path="*" element={<HomeNoLogin />} />
      </>
    );
    if (!role) {
      return route;
    }
    switch (role) {
      case enums.RoleUser.CUSTOMER:
        route = (
          <>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/payment" element={<PaymentSreen />}></Route>
          </>
        );
        break;
      case enums.RoleUser.SALLER:
        route = (
          <>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/shop/:type" element={<ShopDetail />}></Route>
            <Route path="/shop/add-product" element={<AddProduct />}></Route>
            <Route
              path="/shop/product/update/:_productId"
              element={<AddProduct />}
            ></Route>
          </>
        );
        break;
      default:
    }
    return route;
  };

  return (
    <div className="App">
      {userState.user._id ? (
        <Routes>
          {routerFromRole(userState.user.role)}
          <Route path="*" element={<HomeNoLogin />} />
          <Route path="notify-push" element={<NotifyPush />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomeNoLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:status" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/notify" element={<Notify />} />{" "}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<HomeNoLogin />} />
        </Routes>
      )}
      {userState.loading || isL ? <Loading /> : <p></p>}
      {isS ? <Modal /> : <p></p>}
    </div>
  );
}

export default App;
