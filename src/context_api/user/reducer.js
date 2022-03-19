const initState = {
  user: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user.token = action.payload.token;
      return { ...state };
  }
}
export { initState };

export default reducer;
