import React from "react";
import "./index.css";
import { Router } from "react-chrome-extension-router";
import Login from "./components/Login";
import AppWrapper from "./components/elements/AppWrapper";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ToastProvider } from "react-toast-notifications";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "./utils";
import Dashboard from "./components/Dashboard";
import DashboardOffline from "./components/DashboardOffline";
import { CircularProgress } from "@material-ui/core";

const App = () => {
  const [user, loading] = useAuthState(auth);
  let localUser = parseUserFromLocalStorage(reactLocalStorage.get("user"));

  if (loading) {
    return (
      <AppWrapper>
        <CircularProgress />
      </AppWrapper>
    );
  }

  return (
    <ToastProvider autoDismissTimeout="3000">
      <LoadingProvider>
        <Router>
          {!user && !localUser && <Login />}
          {!!user && <Dashboard />}
          {!!localUser && <DashboardOffline />}
        </Router>
      </LoadingProvider>
    </ToastProvider>
  );
};

export default App;
