import React, { useEffect } from "react";
import { AppWrapper } from "./styles/BasicStyles";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const App = () => {
  const [usernameLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy(
    ""
  );

  useEffect(() => {
    setUserLocalStorage(reactLocalStorage.get("username"), (currentUser) => {
      if (!currentUser) {
        let username = prompt("Please enter your name:", "");
        reactLocalStorage.set("username", username);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameLocalStorage]);

  return (
    <AppWrapper>{usernameLocalStorage && usernameLocalStorage}</AppWrapper>
  );
};

export default App;
