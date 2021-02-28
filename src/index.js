import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router } from "react-chrome-extension-router";
import Login from "./components/Login";
import AppWrapper from "./components/elements/AppWrapper";

const App = () => {
  return (
    <Router>
      <AppWrapper>
        <Login />
      </AppWrapper>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
