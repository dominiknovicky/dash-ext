import React, { useEffect, useState } from "react";
import { AppWrapper } from "./styles/BasicStyles";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { CircularProgress } from "@material-ui/core";
import { isUserEmpty, doesUserExist } from "./utils";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const App = () => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy({
    name: "",
    dateOfBirth: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    let user = reactLocalStorage.get("user");
    user = doesUserExist(user);
    setUserLocalStorage(user, () => {
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmited]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: values.firstName,
      dateOfBirth: dateOfBirth,
    };
    reactLocalStorage.set("user", JSON.stringify(user));
    setIsSubmited(true);
  };

  return isLoaded ? (
    <AppWrapper>
      {isUserEmpty(userLocalStorage) ? (
        <Login
          handleSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          dateOfBirth={dateOfBirth}
          setdateOfBirth={setdateOfBirth}
        />
      ) : (
        <Dashboard userLocalStorage={userLocalStorage} />
      )}
    </AppWrapper>
  ) : (
    <AppWrapper>
      <CircularProgress />
    </AppWrapper>
  );
};

export default App;
