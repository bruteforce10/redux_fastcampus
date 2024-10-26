const DEFAULT_STATE = {
  username: "",
  id: "",
  role: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    return {
      ...state,
      username: action.payload.username,
      id: action.payload.id,
      role: action.payload.role,
    };
  } else if (action.type === "USER_LOGOUT") {
    return DEFAULT_STATE;
  }
  return state;
};
