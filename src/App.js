import "./App.css";

import HomeNoLogin from "./pages/no_login/index";
import socketClient from "socket.io-client";

import UserContext from "./context_api/user/context";
import SocketContext from "./context_api/socketIo/context";

import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/no_login/register";
import Login from "./pages/no_login/login";
import ForgotPassword from "./pages/no_login/forgotPasword";
import Loading from "./commoms/loading/index";
import Notify from "./pages/no_login/notify";
import ResetPassword from "./pages/no_login/resetPassword";
import Store from "./pages/has_login/store";
import NotifyPush from "./pages/has_login/notificationPush";
import * as contants from "./constants/constants";
import Profile from "./pages/has_login/profile/index";
function App() {
  const [userState] = useContext(UserContext);
  const [socketIo, setSocketIo] = useContext(SocketContext);

  useEffect(() => {
    if (userState.user.token) {
      var socket = socketClient(contants.SOCKET_IO);
      setSocketIo(socket);
      if (socket) {
        socket.emit("login", "12345");
        socket.on("return", (data) => console.log(data));
      }
    }
  }, [userState]);

  return (
    <div className="App">
      {userState.user.token ? (
        <Routes>
          <Route path="*" element={<Store />} />
          <Route path="notify-push" element={<NotifyPush />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomeNoLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/notify" element={<Notify />} />{" "}
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<HomeNoLogin />} />
        </Routes>
      )}
      {userState.loading ? <Loading /> : <p></p>}
    </div>
  );
}

export default App;
