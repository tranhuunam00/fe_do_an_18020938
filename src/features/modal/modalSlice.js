import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    component: null,
  },
  reducers: {
    showModal(state) {
      state.show = true;
    },
    hideModal(state) {
      state.show = false;
    },
    changeComponent(state, action) {
      state.component = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export const selectorModal = (state) => state.modal;

export default modalSlice.reducer;
