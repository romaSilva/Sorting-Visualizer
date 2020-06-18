import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { quickSort } from "../functions/quickSort";
import { generateRandomArray } from "../utils/random";

const Store = (props) => {
  const initialState = {
    array: [],
  };

  const handleNewArray = () => {
    const arr = generateRandomArray();
    dispatch({
      type: "SET_ARRAY",
      payload: arr,
    });
  };

  const handleQuickSort = () => {
    let tempArr = state.array;
    quickSort(tempArr, 0, tempArr.length - 1);
    dispatch({
      type: "SET_ARRAY",
      payload: tempArr,
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider
      value={{ array: state.array, handleNewArray, handleQuickSort }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Store;
