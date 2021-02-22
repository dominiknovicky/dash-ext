import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./contexts/AuthContext";
import {
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";
import { AppWrapper } from "./styles/BasicStyles";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Application from "./components/Application";

const App = () => {
  useEffect(() => {
    const { component, props } = getCurrent();
    console.log(
      component
        ? `There is a component on the stack! ${component} with ${props}`
        : `The current stack is empty so Router's direct children will be rendered`
    );
    const components = getComponentStack();
    console.log(`The stack has ${components.length} components on the stack`);
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <AuthProvider>
            <Application />
          </AuthProvider>
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
