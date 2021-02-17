import React, { useEffect, useState, useContext } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { isUserEmpty, doesUserExist } from "./utils";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { withTheme } from "@material-ui/styles";
import Homepage from "./components/Homepage";
import { LoadingContext } from "./contexts/LoadingContext";

const App = ({ theme }) => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy({
    name: "",
    dateOfBirth: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const [isLoaded, setIsLoaded] = useContext(LoadingContext);

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

  return (
    <Homepage theme={theme} isLoaded={isLoaded}>
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
    </Homepage>
  );
};

export default withTheme(App);
