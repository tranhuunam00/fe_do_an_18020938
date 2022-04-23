import { createSlice } from "@reduxjs/toolkit";
import * as helper from "../../../service/helper";

const initialState = {
  isLoading: false,
  currentCart: [],
  detailCart: {},

  reset: false,
};

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFilterCart(state, action) {
      state.filter = action.payload;
    },

    createCart(state, action) {
      state.isLoading = true;
    },

    createCartSuccess(state, action) {
      state.isLoading = false;
    },

    createCartFailed(state, action) {
      state.isLoading = false;
    },

    getCart(state, action) {
      state.isLoading = true;
    },

    getCartSuccess(state, action) {
      state.isLoading = false;
      state.currentCart = action.payload;
    },

    getCartFailed(state, action) {
      state.isLoading = false;
    },

    updateCart(state, action) {
      state.isLoading = true;
    },

    updateCartSuccess(state, action) {
      state.isLoading = false;
      state.currentCart = action.payload;
    },

    updateCartFailed(state, action) {
      state.isLoading = false;
    },

    deleteCart(state, action) {
      state.isLoading = true;
    },

    deleteCartSuccess(state, action) {
      state.isLoading = false;
      state.currentCart = action.payload;
    },

    deleteCartFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export const selectCurrentCarts = (state) => state.carts.currentCart;
export const selectDetailCart = (state) => state.carts.detailCart;
export const selectIsLoadingCart = (state) => state.carts.isLoading;

const cartReducer = cartSlice.reducer;
export default cartReducer;
