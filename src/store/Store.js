import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { getQuickSortAnimations } from "../functions/quickSort";
import { getBubbleSortAnimations } from "../functions/bubbleSort";
import { getInsertSortAnimations } from "../functions/insertSort";
import { getMergeSortAnimations } from "../functions/mergeSort";
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
    } else if (sortMethod === "insert") {
      const [arr, frames] = getInsertSortAnimations(state.array);
      tempArr = arr;
      animations = frames;
    } else if (sortMethod === "merge") {
      const [arr, frames] = getMergeSortAnimations(state.array);
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
      } else if (animations[i].type === "definite") {
        setTimeout(() => {
          firstBarStyle.backgroundColor = animations[i].color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          firstBarStyle.height = `${animations[i].newHeights}px`;
          secondBarStyle.height = `${animations[i].newHeights}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    const RESTORE_TIME = ANIMATION_SPEED_MS * animations.length + 500;

    if (sortMethod === "insert" || sortMethod === "merge") {
      restoreAll(tempArr, barsArr, "#18FF00", RESTORE_TIME - 450);
      restoreAll(tempArr, barsArr, "white", RESTORE_TIME + 450);
    } else {
      restoreAll(tempArr, barsArr, "white", RESTORE_TIME);
    }
  };

  const restoreAll = (arr, bars, color, time) => {
    setTimeout(() => {
      dispatch({ type: "SET_ARRAY", payload: arr });
      dispatch({ type: "SET_SORTING", payload: undefined });
      Array.from(bars).forEach((el) => (el.style.backgroundColor = color));
    }, time);
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
