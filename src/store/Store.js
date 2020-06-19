import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { getQuickSortAnimations } from "../functions/quickSort";
import { generateRandomArray } from "../utils/random";

const ANIMATION_SPEED_MS = 10;

const Store = (props) => {
  const initialState = {
    array: [],
    sorting: undefined,
    stopAnimation: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNewArray = () => {
    const arr = generateRandomArray();
    dispatch({
      type: "SET_ARRAY",
      payload: arr,
    });
  };

  const handleSorting = () => {
    dispatch({
      type: "SET_SORTING",
      payload: "quick",
    });
  };

  const handleCancel = () => {
    dispatch({
      type: "SET_STOP",
      payload: true,
    });
  };

  const handleQuickSort = () => {
    const [tempArr, animations] = getQuickSortAnimations(state.array);
    const barsArr = document.getElementsByClassName("bars");

    for (let i = 0; i < animations.length; i++) {
      const firstBarStyle = barsArr[animations[i].indexes[0]].style;
      const secondBarStyle = barsArr[animations[i].indexes[1]].style;

      if (animations[i].type === "color") {
        setTimeout(() => {
          firstBarStyle.backgroundColor = animations[i].color;
          secondBarStyle.backgroundColor = animations[i].color;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].type === "swap") {
        setTimeout(() => {
          firstBarStyle.height = `${animations[i].newHeights[0]}px`;
          secondBarStyle.height = `${animations[i].newHeights[1]}px`;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          firstBarStyle.backgroundColor = animations[i].color;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = ANIMATION_SPEED_MS * animations.length + 500;
    setTimeout(() => {
      dispatch({ type: "SET_ARRAY", payload: tempArr });
      dispatch({ type: "SET_SORTING", payload: undefined });
      Array.from(barsArr).forEach((el) => (el.style.backgroundColor = "white"));
    }, RESTORE_TIME);
  };

  return (
    <Context.Provider
      value={{
        array: state.array,
        sorting: state.sorting,
        stopAnimation: state.stopAnimation,
        handleNewArray,
        handleQuickSort,
        handleSorting,
        handleCancel,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Store;
