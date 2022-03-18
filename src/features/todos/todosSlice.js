import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
};

export const getTodos = createAsyncThunk("todos/addAllTodos", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  } catch (err) {}
});

export const todoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addAllTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      console.log("fetching");
    },
    [getTodos.fulfilled]: (state, action) => {
      console.log("done");
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      console.log("error");
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllTodos, addAllTodos } = todoSlice.actions;

const todosReducer = todoSlice.reducer;

export default todosReducer;
