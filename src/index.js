import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Router } from "react-chrome-extension-router";
import { AppWrapper } from "./styles/BasicStyles";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <Login />
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
