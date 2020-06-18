export default (state, action) => {
  switch (action.type) {
    case "SET_ARRAY":
      return {
        ...state,
        array: action.payload,
      };

    default:
      break;
  }
};
