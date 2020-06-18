import React from "react";

import Store from "./store/Store";
import Header from "./components/Header";
import Main from "./components/Main";

import "./styles/globalStyle.css";

function App() {
  return (
    <Store>
      <Header />
      <Main />
    </Store>
  );
}

export default App;
