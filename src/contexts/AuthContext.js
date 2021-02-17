import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
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
      setCurrentUser(user, () => {
        setIsLoaded(true);
        console.log(user);
      });
    });
    return unsubscribe;
  }, []);

  // const value = {
  //   currentUser,
  //   isLoaded,
  // };

  const value = useMemo(() => [isLoaded, setIsLoaded], [isLoaded], currentUser);

  return (
    <AuthContext.Provider value={value}>
      {isLoaded && children}
    </AuthContext.Provider>
  );
}
