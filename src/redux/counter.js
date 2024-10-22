const DEFAULT_STATE = {
  count: 0,
};

export const counterReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "INCREMENT_COUNT") {
    return { ...state, count: state.count + 1 };
  } else if (action.type === "DECREMENT_COUNT") {
    return { ...state, count: state.count - 1 };
  } else if (action.type === "SET_COUNT") {
    return { ...state, count: action.payload };
  }
  return state;
};
