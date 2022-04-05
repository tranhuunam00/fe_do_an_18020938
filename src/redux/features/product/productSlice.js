import { createSlice } from "@reduxjs/toolkit";
import * as helper from "../../../service/helper";

const initialState = {
  loading: false,
  currentProduct: JSON.parse(localStorage.getItem("PRODUCT")) || {},
  status: { statusCode: null, success: null, message: "" },
};
