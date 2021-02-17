import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LoadingContextProvider>
        <App />
      </LoadingContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
