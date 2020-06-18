import React, { useContext } from "react";

import context from "../store/context";

import "../styles/headerStyle.css";

const Header = () => {
  const { handleNewArray, handleQuickSort } = useContext(context);

  return (
    <div className="header-container">
      <button onClick={() => handleNewArray()}>Generate New Array</button>
      <button onClick={() => handleQuickSort()}>Quick Sort</button>
      <button>Bubble Sort</button>
    </div>
  );
};

export default Header;
