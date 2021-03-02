import React, { createContext, useState, useEffect } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";
import firebase from "../firebase";

export const AuthContext = createContext();

const { Provider } = AuthContext;

export const AuthProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState({});
  const [localStorageUser, setlocalStorageUser] = useState({});

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!!user) setFirebaseUser(user);

      let localUser = reactLocalStorage.get("user");
      localUser = parseUserFromLocalStorage(localUser);
      if (!!localUser) setlocalStorageUser(localUser);

      setIsLoaded(true);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider value={[firebaseUser, localStorageUser]}>
      {isLoaded && children}
    </Provider>
  );
};
