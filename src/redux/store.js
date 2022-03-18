import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../features/counter/counterSlice";
import todosReducer from "../features/todos/todosSlice";

const store = configureStore({
  reducer: { counter: countReducer, todos: todosReducer },
});
export default store;
