// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   loggedIn: false,
//   currentUsers: JSON.parse(localStorage.getItem("USER")) || {},
//   accessToken: localStorage.getItem("ACCESS_TOKEN") || null,
//   status: { statusCode: null, success: null, message: "" },
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.loading = true;
//       state.status = {
//         statusCode: null,
//         success: null,
//         message: "",
//       };
//     },

//     loginSuccess(state, action) {
//       state.loading = false;
//       state.loggedIn = true;
//       state.currentUsers = action.payload.data.data.user;
//       state.accessToken = action.payload.data.data.token;

//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },

//     loginFailed(state, action) {
//       state.loggedIn = false;
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },

//     logout(state, action) {
//       state.loading = false;
//       state.loggedIn = false;
//       state.accessToken = null;
//       state.currentUsers = {};
//       state.status = { statusCode: null, success: null, message: "" };
//     },

//     //register

//     register(state, action) {
//       state.loading = true;
//       state.status = { statusCode: null, success: null, message: "" };
//     },
//     registerSuccess(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },
//     registerFailed(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },

//     //send mail reset password
//     sendMail(state) {
//       state.loading = true;
//       state.status = { statusCode: null, success: null, message: "" };
//     },

//     sendMailSuccess(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },
//     sendMailFailed(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },

//     resetPassword(state) {
//       state.loading = true;
//       state.status = { statusCode: null, success: null, message: "" };
//     },

//     resetPasswordSuccess(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },
//     resetPasswordFailed(state, action) {
//       state.loading = false;
//       state.status = {
//         statusCode: action.payload.status,
//         success: action.payload.data.success,
//         message: action.payload.data.message,
//       };
//     },

//     resetStatus(state) {
//       state.status = { statusCode: null, success: null, message: "" };
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export const selectLoggedIn = (state) => state.auth.loggedIn;
// export const selectRole = (state) => state.auth.currentUsers.role;
// export const selectToken = (state) => state.auth.accessToken;
// export const selectCurrentUsers = (state) => state.auth.currentUsers;
// export const selectLoading = (state) => state.auth.loading;
// export const selectStatus = (state) => state.auth.status;

// const authReducer = authSlice.reducer;
// export default authReducer;
