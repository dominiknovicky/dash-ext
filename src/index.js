import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthProvider } from "./contexts/AuthContext";
import { Router } from "react-chrome-extension-router";
import { AppWrapper } from "./styles/BasicStyles";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DashboardOffline from "./components/DashboardOffline";

const App = () => {
  useEffect(() => {}, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <AuthProvider>
            <Login />
            <Dashboard />
            <DashboardOffline />
          </AuthProvider>
        </AppWrapper>
      </ThemeProvider>
    </Router>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
