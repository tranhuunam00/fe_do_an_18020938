import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import UserProvider from "./context_api/user/provider";
import SocketProvider from "./context_api/socketIo/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import ScrollToTop from "./components/scrollToTop";
toast.configure();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SocketProvider>
          <Provider store={store}>
            <ScrollToTop />
            <App />
          </Provider>
        </SocketProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
