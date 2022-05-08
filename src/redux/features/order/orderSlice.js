import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentOrders: [],
  pagination: {},
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

    updateOrder(state, action) {
      state.isLoading = true;
    },

    updateOrderSuccess(state, action) {
      state.isLoading = false;
    },

    updateOrderFailed(state, action) {
      state.isLoading = false;
    },
    getAllOrder(state, action) {
      state.isLoading = true;
    },

    getAllOrderSuccess(state, action) {
      state.isLoading = false;
      state.currentOrders = action.payload.orders;
      state.pagination = action.payload.pagination;
    },

    getAllOrderFailed(state, action) {
      state.isLoading = false;
    },

    updateCurrentOrders(state, action) {
      state.currentOrders = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export const selectIsLoadingOrder = (state) => state.orders.isLoading;
export const selectCurrentOrders = (state) => state.orders.currentOrders;
export const selectPaginationOrders = (state) => state.orders.pagination;

const orderReducer = orderSlice.reducer;
export default orderReducer;
