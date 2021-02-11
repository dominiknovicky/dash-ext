import React, { useEffect, useState } from "react";
import { AppWrapper } from "./styles/BasicStyles";
import { reactLocalStorage } from "reactjs-localstorage";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import {
  FormControl,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import { isUserEmpty } from "./utils";
import Login from "./components/Login";

const App = () => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setSelectedDate] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy({
    name: "",
    dateOfBirth: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    let user = reactLocalStorage.get("user");
    user =
      user === undefined
        ? {
            name: "",
            dateOfBirth: "",
          }
        : JSON.parse(user);
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
            <Button
              disabled={!(values.firstName !== "" && dateOfBirth !== null)}
              variant="contained"
              color="primary"
              type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      ) : (
        <Login userLocalStorage={userLocalStorage} />
      )}
    </AppWrapper>
  ) : (
    <AppWrapper>
      <CircularProgress />
    </AppWrapper>
  );
};

export default App;
