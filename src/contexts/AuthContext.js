import React, { createContext, useState, useEffect, useContext } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { auth } from "../firebase";
import { CircularProgress } from "@material-ui/core";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy();
  const [localUser, setLocalUser] = useStateWithCallbackLazy();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);

  function signOut() {
    return auth.signOut();
  }

  useEffect(() => {
    // auth.signOut();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user, () => setIsUserLoaded(true));
    });

    const localUser = reactLocalStorage.get("user");
    setLocalUser(parseUserFromLocalStorage(localUser), () =>
      setIsLocalLoaded(true)
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    localUser,
    signOut,
  };

  return isUserLoaded && isLocalLoaded ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    <AuthContext.Provider value={value}>
      <CircularProgress />
    </AuthContext.Provider>
  );
}
