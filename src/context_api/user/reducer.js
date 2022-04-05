const initState = {
  user: localStorage.getItem("USER")
    ? JSON.parse(localStorage.getItem("USER"))
    : {
        user: { name: "nam" },
        loading: false,
      },
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user = action.payload.user;
      localStorage.setItem("USER", JSON.stringify(state.user));
      return { ...state };
    case "CHANGE_USER":
      state.user = action.payload.user;
      localStorage.setItem("USER", JSON.stringify(state.user));
      return { ...state };

    case "SHOW_LOADING":
      state.loading = true;
      return { ...state };
    case "HIDE_LOADING":
      state.loading = false;
      return { ...state };
    case "REMOVE_USER":
      state.loading = false;

      return { loading: false, user: {} };
  }
}
export { initState };

export default reducer;
