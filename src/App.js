import "./App.css";
import Counter from "./components/Counter";
import HomeNoLogin from "./pages/no_login/index";

import UserContext from "./context_api/user/context";
import React, { useContext } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [userState] = useContext(UserContext);
  console.log(userState.user);
  return (
    <div className="App">
      <Routes>
        {userState.user.name ? (
          <Route index element={<Counter />} />
        ) : (
          <Route index element={<HomeNoLogin />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
