const initState = {
  user: JSON.parse(localStorage.getItem("user")) || { name: "nam" },
};

console.log(initState);
function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user = action.payload.user;
      state.user.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state.user));
      return { ...state };
  }
}
export { initState };

export default reducer;
