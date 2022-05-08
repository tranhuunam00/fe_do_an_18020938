import { createSlice } from "@reduxjs/toolkit";
import { dialogActions } from "../dialog/dialogSlice";
const initialState = {
  show: false,
  component: null,
  valueState: {},
  functionHandle: null,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    showModal(state) {
      state.show = true;
      dialogActions.resetState();
    },
    hideModal(state) {
      state.show = false;
    },
    changeModal(state, action) {
      state.component = action.payload.component;
      state.valueState = action.payload.valueState;
      state.functionHandle = action.payload.functionHandle;
    },
    resetState(state, action) {
      state = initialState;
    },
    changeValueState(state, action) {
      state.valueState = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export const selectorModal = (state) => state.modal;
export const selectorShowModal = (state) => state.modal.show;

export const selectorModalValue = (state) => state.modal.valueState;
export const selectorModalFunction = (state) => state.modal.functionHandle;
export const selectorModalComponent = (state) => state.modal.component;

export default modalSlice.reducer;
