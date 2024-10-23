const DEFAULT_STATE = {
  username: "",
  id: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    return {
      ...state,
      username: action.payload.username,
      id: action.payload.id,
    };
  }
  return state;
};
