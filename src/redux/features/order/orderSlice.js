import { createSlice } from "@reduxjs/toolkit";
import * as helper from "../../../service/helper";

const initialState = {
  isLoading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder(state, action) {
      state.isLoading = true;
    },

    createOrderSuccess(state, action) {
      state.isLoading = false;
    },

    createOrderFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export const selectIsLoadingOrder = (state) => state.orders.isLoading;

const orderReducer = orderSlice.reducer;
export default orderReducer;
