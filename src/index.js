import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router } from "react-chrome-extension-router";
import Login from "./components/Login";
import AppWrapper from "./components/elements/AppWrapper";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <ToastProvider autoDismissTimeout="3000">
      <LoadingProvider>
        <Router>
          <AppWrapper>
            <Login />
          </AppWrapper>
        </Router>
      </LoadingProvider>
    </ToastProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
