const initState = {
  user: JSON.parse(localStorage.getItem("user")) || {
    name: "nam",
    loading: false,
  },
};

console.log(initState);
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user = action.payload.user;
      state.user.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.user));
      return { ...state };

    case "SHOW_LOADING":
      state.loading = true;
      return { ...state };
    case "HIDE_LOADING":
      state.loading = false;
      return { ...state };
    case "REMOVE_USER":
      state.loading = false;
      return { ...initState };
  }
}
export { initState };

export default reducer;
