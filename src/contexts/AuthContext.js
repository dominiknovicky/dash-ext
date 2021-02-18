import React, { createContext, useState, useEffect, useContext } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { auth } from "../firebase";
import { CircularProgress } from "@material-ui/core";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user, () => setIsLoaded(true));
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    isLoaded,
  };

  return isLoaded ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    <AuthContext.Provider value={value}>
      <CircularProgress />
    </AuthContext.Provider>
  );
}
