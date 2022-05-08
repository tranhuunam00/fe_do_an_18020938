import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  show: false,
  component: null,
  valueState: {},
  functionHandle: () => {},
  title: "",
  showModal: false,
};
const dialogSlice = createSlice({
  name: "dialog",
  initialState: initialState,
  reducers: {
    showDialog(state) {
      state.show = true;
    },
    hideDialog(state) {
      state.show = false;
      state.showModal = false;
    },
    changeDialog(state, action) {
      state.component = action.payload.component;
      state.valueState = action.payload.valueState;
      state.title = action.payload.title;

      state.functionHandle = action.payload.functionHandle;
    },
    resetState(state, action) {
      state = initialState;
    },
    setShowModal(state, action) {
      state.showModal = true;
    },
    setHideModal(state, action) {
      state.showModal = false;
    },
  },
});

export const dialogActions = dialogSlice.actions;

export const selectorDialog = (state) => state.dialog;
export const selectorShowDialog = (state) => state.dialog.show;

export const selectorDialogValue = (state) => state.dialog.valueState;
export const selectorDialogFunction = (state) => state.dialog.functionHandle;
export const selectorDialogComponent = (state) => state.dialog.component;

export const selectorDialogTitle = (state) => state.dialog.title;
export const selectorDialogShowModal = (state) => state.dialog.showModal;

export default dialogSlice.reducer;
