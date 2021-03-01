import React, { createContext, useState } from "react";

export const LoadingContext = createContext();

const { Provider } = LoadingContext;

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return <Provider value={[isLoading, setIsLoading]}>{children}</Provider>;
};
