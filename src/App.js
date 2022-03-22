import "./App.css";
import Counter from "./components/Counter";
import HomeNoLogin from "./pages/no_login/index";

import UserContext from "./context_api/user/context";
import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/no_login/register";
import Login from "./pages/no_login/login";
import ForgotPassword from "./pages/no_login/forgotPasword";

function App() {
  const [userState] = useContext(UserContext);
  useEffect(() => {
    console.log(userState);
  }, [userState]);
  return (
    <div className="App">
      {userState.user.token ? (
        <Routes>
          <Route index element={<Counter />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomeNoLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
