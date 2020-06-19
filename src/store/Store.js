import React, { useReducer } from "react";

import Context from "./context";
import reducer from "./reducer";
import { getQuickSortAnimations } from "../functions/quickSort";
import { generateRandomArray } from "../utils/random";

const ANIMATION_SPEED_MS = 10;

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
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const barsArr = document.getElementsByClassName("bars");
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
