import { createSlice } from "@reduxjs/toolkit";
import * as helper from "../../../service/helper";

const initialState = {
  isLoading: false,
  currentProducts: localStorage.getItem("PRODUCT")
    ? helper.getProductFromLocal()
    : {},
  detailProducts: {},
  pagination: {},
  filter: {},
  reset: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFilterProduct(state, action) {
      state.filter = action.payload;
    },

    getAllProduct(state, action) {
      state.isLoading = true;
      state.status = {
        statusCode: null,
        success: null,
        message: "",
      };
    },

    getAllProductSuccess(state, action) {
      state.isLoading = false;
      const { type, response } = action.payload;

      if (type === "ALL") {
        state.currentProducts = response.data.data;
      } else {
        state.currentProducts[type] = response.data.data;
      }
    },

    getAllProductFailed(state, action) {
      state.isLoading = false;
    },

    createProduct(state, action) {
      state.isLoading = true;
    },

    createProductSuccess(state, action) {
      state.isLoading = false;
    },

    createProductFailed(state, action) {
      state.isLoading = false;
    },

    getDetailProduct(state, action) {
      state.isLoading = true;
    },

    getDetailProductSuccess(state, action) {
      state.isLoading = false;
      state.detailProducts = action.payload.data.data;
    },

    getDetailProductFailed(state, action) {
      state.isLoading = false;
    },

    updateProduct(state, action) {
      state.isLoading = true;
    },

    updateProductSuccess(state, action) {
      state.isLoading = false;
      state.detailProducts = action.payload.data.data;
    },

    updateProductFailed(state, action) {
      state.isLoading = false;
    },
  },
});

export const productActions = productSlice.actions;

export const selectCurrentProducts = (state) => state.products.currentProducts;
export const selectDetailProducts = (state) => state.products.detailProducts;
export const selectIsLoadingProduct = (state) => state.products.isLoading;
export const selectFilterProduct = (state) => state.products.filter;

const productReducer = productSlice.reducer;
export default productReducer;
