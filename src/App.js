import React from "react";
import "./index.css";
import { Router } from "react-chrome-extension-router";
import Login from "./components/Login";
import AppWrapper from "./components/elements/AppWrapper";
import { ToastProvider } from "react-toast-notifications";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "./utils";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardOffline from "./components/dashboard/DashboardOffline";
import { TransverseLoading } from "react-loadingg";
import theme from "./theme";

const App = () => {
  const [user, loading] = useAuthState(auth);
  let localUser = parseUserFromLocalStorage(reactLocalStorage.get("user"));

  if (loading) {
    return (
      <AppWrapper>
        <TransverseLoading color={theme.palette.primary.main} />
      </AppWrapper>
    );
  }

  return (
    <ToastProvider autoDismissTimeout="3000">
      <Router>
        {!user && !localUser && <Login />}
        {!!user && <Dashboard />}
        {!!localUser && <DashboardOffline />}
      </Router>
    </ToastProvider>
  );
};

export default App;
