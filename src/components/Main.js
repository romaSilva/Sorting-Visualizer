import React, { useEffect, useContext } from "react";

import context from "../store/context";

import "../styles/mainStyle.css";

const Main = () => {
  const { array, handleNewArray } = useContext(context);

  useEffect(() => {
    handleNewArray();
  }, []);

  return (
    <div className="main-container">
      {array.map((el, index) => (
        <div key={index} style={{ height: el }}></div>
      ))}
    </div>
  );
};

export default Main;
