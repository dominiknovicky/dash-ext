import React, { useEffect, useState } from "react";
import { AppWrapper } from "./styles/BasicStyles";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";

const App = () => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setSelectedDate] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let user = reactLocalStorage.get("user");
    user = user === undefined ? "" : JSON.parse(user);
    console.log(user);
    setUserLocalStorage(user, (currentUser) => {
      console.log(currentUser);
      setIsLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocalStorage.name, userLocalStorage.dateOfBirth]);

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
  };

  const isUserEmpty = (user) => {
    return user === "";
  };

  return isLoaded ? (
    <AppWrapper>
      {isUserEmpty(userLocalStorage) ? (
        <form
          onSubmit={handleSubmit}
          style={{
            flexDirection: "column",
            display: "flex",
            maxWidth: "300px",
            width: "100%",
            padding: "30px 40px",
            backgroundColor: "rgba(255,255,255,0.5)",
            boxShadow: "0 0 10px 0 #bfbfbf",
            borderRadius: 5,
          }}>
          <FormControl>
            <TextField
              required
              margin="normal"
              id="firstName"
              label="First Name"
              variant="filled"
              value={values.firstName}
              onChange={handleChange("firstName")}
              type="text"
            />
          </FormControl>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              margin="normal"
              disableFuture
              inputVariant="filled"
              id="dateOfBirth"
              label="Date of Birth"
              format="dd/MM/yyyy"
              value={dateOfBirth}
              onChange={setSelectedDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <FormControl margin="normal">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      ) : (
        <div>{userLocalStorage.name}</div>
      )}
    </AppWrapper>
  ) : (
    <AppWrapper>Loading...</AppWrapper>
  );
};

export default App;
