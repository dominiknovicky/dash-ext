import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router } from "react-chrome-extension-router";
import Login from "./components/Login";
import AppWrapper from "./components/elements/AppWrapper";
import { LoadingProvider } from "./contexts/LoadingContext";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import firebase from "./firebase";
import Dashboard from "./components/Dashboard";
import DashboardOffline from "./components/DashboardOffline";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "./utils";

const App = () => {
  const [firebaseUser, localStorageUser] = useContext(AuthContext);

  // const [firebaseUser, setFirebaseUser] = useState();
  // const [isFirebaseUser, setIsFirebaseUser] = useState(false);
  // const [isLocalStorageUser, setisLocalStorageUser] = useState(false);

  useEffect(() => {
    console.log(firebaseUser, localStorageUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoadingProvider>
      <AuthProvider>
        <Router>
          <AppWrapper>
            <Login />
            {/* {!isFirebaseUser && isLocalStorageUser && <Login />}
          {isFirebaseUser && <Dashboard user={firebaseUser} />}
        {isLocalStorageUser && <DashboardOffline />} */}
          </AppWrapper>
        </Router>
      </AuthProvider>
    </LoadingProvider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
