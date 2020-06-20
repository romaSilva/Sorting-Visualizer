import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { getQuickSortAnimations } from "../functions/quickSort";
import { getBubbleSortAnimations } from "../functions/bubbleSort";
import { generateRandomArray } from "../utils/random";

const ANIMATION_SPEED_MS = 8;

const Store = (props) => {
  const initialState = {
    array: [],
    sorting: undefined,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNewArray = () => {
    const arr = generateRandomArray();
    dispatch({
      type: "SET_ARRAY",
      payload: arr,
    });
  };

  const setSorting = (sortMethod) => {
    dispatch({
      type: "SET_SORTING",
      payload: sortMethod,
    });
  };

  const handleSorting = (sortMethod) => {
    let tempArr = [];
    let animations = [];

    if (sortMethod === "quick") {
      const [arr, frames] = getQuickSortAnimations(state.array);
      tempArr = arr;
      animations = frames;
    } else if (sortMethod === "bubble") {
      const [arr, frames] = getBubbleSortAnimations(state.array);
      tempArr = arr;
      animations = frames;
    }

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
        handleNewArray,
        setSorting,
        handleSorting,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Store;
