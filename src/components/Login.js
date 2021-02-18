import React, { useEffect, useState, useContext } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import firebase from "firebase/app";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LoginTitle from "./elements/LoginTitle";
import Divider from "./elements/Divider";
import { reactLocalStorage } from "reactjs-localstorage";
import { isUserEmpty, parseUserFromLocalStorage } from "../utils";
import { withTheme } from "@material-ui/styles";
import { useAuth } from "../contexts/AuthContext";
import { Link, goBack, goTo, popToTop } from "react-chrome-extension-router";
import Dashboard from "./Dashboard";
import DashboardOffline from "./DashboardOffline";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Login = ({ theme }) => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy(
    null
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(!!(userLocalStorage && !!currentUser));
    if (!!currentUser) goTo(Dashboard, { theme });

    let user = reactLocalStorage.get("user");
    user = parseUserFromLocalStorage(user);
    console.log("local", !!user);
    if (!!user) goTo(DashboardOffline, { theme });

    setUserLocalStorage(user, () => {
      // setIsLoaded(true);
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

  // fix this
  return !!(userLocalStorage && !!currentUser) ? (
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

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </form>
  ) : null;
};

export default withTheme(Login);
