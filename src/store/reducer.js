export default (state, action) => {
  switch (action.type) {
    case "SET_ARRAY":
      return {
        ...state,
        array: action.payload,
      };
    case "SET_SORTING":
      return {
        ...state,
        sorting: action.payload,
      };
    case "SET_STOP":
      return {
        ...state,
        stopAnimation: action.payload,
      };
    default:
      break;
  }
};
