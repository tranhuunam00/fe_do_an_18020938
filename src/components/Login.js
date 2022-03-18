import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import { getTodos } from "../features/todos/todosSlice";

const Login = () => {
  const dispatch = useDispatch();

  return <div>login</div>;
};
export default Login;
