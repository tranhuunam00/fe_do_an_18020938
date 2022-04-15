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
      console.log(type);
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
  },
});

export const productActions = productSlice.actions;

export const selectCurrentProducts = (state) => state.products.currentProducts;
export const selectDetailProducts = (state) => state.products.detailProducts;
export const selectIsLoading = (state) => state.products.isLoading;

const productReducer = productSlice.reducer;
export default productReducer;
