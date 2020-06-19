import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { getQuickSortAnimations } from "../functions/quickSort";
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
    const [tempArr, animations] = getQuickSortAnimations(state.array);
    for (let i = 0; i < animations.length - 1; i++) {
      const isColorChange = i % 6 === 0 || i % 6 === 1;
      const bars = document.getElementsByClassName("bars");
      if (isColorChange) {
        const color = i % 6 === 0 ? "red" : "blue";
        const [barOneIndex, barTwoIndex] = animations[i];
        if (barOneIndex === -1) continue;
        const barOneStyle = bars[barOneIndex].style;
        const barTwoStyle = bars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 10);
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = bars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * 10);
      }
    }
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
