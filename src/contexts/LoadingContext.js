import React, { createContext, useState } from "react";

export const LoadingContext = createContext();

const { Provider } = LoadingContext;

export const LoadingProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return <Provider value={[isLoaded, setIsLoaded]}>{children}</Provider>;
};
