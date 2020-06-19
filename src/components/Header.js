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
  } = useContext(context);

  return (
    <div className="header-container">
      <div className="btn-container">
        <button
          style={sorting ? { color: "#7A7A7A", cursor: "not-allowed" } : {}}
          onClick={() => {
            if (!sorting) {
              handleNewArray();
            }
          }}
        >
          Generate New Array
        </button>
      </div>

      <div className="btn-container">
        <button
          style={
            sorting !== "quick" && sorting
              ? { color: "#7A7A7A", cursor: "not-allowed" }
              : {}
          }
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
          style={
            sorting !== "bubble" && sorting
              ? { color: "#7A7A7A", cursor: "not-allowed" }
              : {}
          }
        >
          Bubble Sort
        </button>
        <button
          style={
            sorting !== "heap" && sorting
              ? { color: "#7A7A7A", cursor: "not-allowed" }
              : {}
          }
        >
          Heap Sort
        </button>
        <button
          style={
            sorting !== "merge" && sorting
              ? { color: "#7A7A7A", cursor: "not-allowed" }
              : {}
          }
        >
          Merge Sort
        </button>
      </div>

      <div className="btn-container">
        <button
          id="stop"
          style={!sorting ? { color: "#7A7A7A", cursor: "not-allowed" } : {}}
          onClick={() => {
            if (sorting) {
              window.location.reload();
            }
          }}
        >
          <AiOutlineStop />
        </button>
      </div>
    </div>
  );
};

export default Header;

const cancelBtnStyle = {};
