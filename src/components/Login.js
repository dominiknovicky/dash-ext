import React, { useEffect, useState, useContext } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { reactLocalStorage } from "reactjs-localstorage";
import { withTheme } from "@material-ui/styles";
import { goTo } from "react-chrome-extension-router";
import { CircularProgress } from "@material-ui/core";
import Dashboard from "./Dashboard";
import DashboardOffline from "./DashboardOffline";
import Divider from "./elements/Divider";
import LoginTitle from "./elements/LoginTitle";
import { parseUserFromLocalStorage } from "../utils";
import { auth, provider } from "../firebase";
import { LoadingContext } from "../contexts/LoadingContext";
import GoogleLoginButton from "./elements/GoogleLoginButton";

const Login = ({ theme }) => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [isLoaded, setIsLoaded] = useContext(LoadingContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!!user) goTo(Dashboard, { user });

      let localUser = reactLocalStorage.get("user");
      localUser = parseUserFromLocalStorage(localUser);
      if (!!localUser) goTo(DashboardOffline);

      setIsLoaded(true);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const localUser = {
      name: values.firstName,
      dateOfBirth: dateOfBirth,
    };
    reactLocalStorage.set("user", JSON.stringify(localUser));
    goTo(DashboardOffline);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return !isLoaded ? (
    <CircularProgress />
  ) : (
    <form
      onSubmit={handleSubmit}
      style={{
        flexDirection: "column",
        display: "flex",
        maxWidth: "300px",
        width: "100%",
      }}>
      <LoginTitle />

      <FormControl>
        <TextField
          required
          margin="normal"
          id="firstName"
          label="First Name"
          variant="outlined"
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
          inputVariant="outlined"
          id="dateOfBirth"
          label="Date of Birth"
          format="dd/MM/yyyy"
          value={dateOfBirth}
          onChange={setdateOfBirth}
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

      <Divider text="or" color={theme.palette.secondary} />

      <GoogleLoginButton onClick={signIn} />
    </form>
  );
};

export default withTheme(Login);
