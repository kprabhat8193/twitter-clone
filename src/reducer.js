export const initialState = {
  user: null,
  following: [],
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_FOLLOWING: "SET_FOLLOWING",
};

const reducer = (state, action) => {
  console.log("reducer called with state ", state);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_FOLLOWING:
      return {
        ...state,
        following: action.following,
      };

    default:
      return state;
  }
};

export default reducer;
