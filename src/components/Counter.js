import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../features/counter/counterSlice";
import { getTodos } from "../features/todos/todosSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment("hihi"))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button aria-label="getAll" onClick={() => dispatch(getTodos())}>
          GetAllTodos
        </button>
      </div>
    </div>
  );
};
export default Counter;
