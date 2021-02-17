import React, { useState, createContext, useMemo } from "react";

// Create Context Object
export const LoadingContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const LoadingContextProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const value = useMemo(() => [isLoaded, setIsLoaded], [isLoaded]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
