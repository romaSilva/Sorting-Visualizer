import React, { useContext } from "react";

import context from "../store/context";

import { AiOutlineStop } from "react-icons/ai";
import "../styles/headerStyle.css";

const Header = () => {
  const {
    sorting,
    handleNewArray,
    handleQuickSort,
    handleSorting,
    handleCancel,
  } = useContext(context);

  return (
    <div className="header-container">
      <button
        style={sorting ? { color: "#7A7A7A" } : {}}
        onClick={() => {
          if (!sorting) {
            handleNewArray();
          }
        }}
      >
        Generate New Array
      </button>
      <button
        style={sorting !== "quick" && sorting ? { color: "#7A7A7A" } : {}}
        onClick={() => {
          if (!sorting) {
            handleSorting();
            handleQuickSort();
          }
        }}
      >
        Quick Sort
      </button>
      <button
        style={sorting !== "bubble" && sorting ? { color: "#7A7A7A" } : {}}
      >
        Bubble Sort
      </button>
      <button style={sorting !== "heap" && sorting ? { color: "#7A7A7A" } : {}}>
        Heap Sort
      </button>
      <button
        style={sorting !== "merge" && sorting ? { color: "#7A7A7A" } : {}}
      >
        Merge Sort
      </button>
      <button id="stop" style={cancelBtnStyle}>
        <AiOutlineStop />
      </button>
    </div>
  );
};

export default Header;

const cancelBtnStyle = {
  display: "flex",
  alignItems: "center",
  fontSize: 18,
};
