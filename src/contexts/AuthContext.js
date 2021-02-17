import React, { createContext, useContext, useState, useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";

import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user, () => setIsLoaded(true));
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isLoaded,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
}
