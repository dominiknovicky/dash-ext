import React, { useEffect, useState } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LoginTitle from "./elements/LoginTitle";
import Divider from "./elements/Divider";
import { reactLocalStorage } from "reactjs-localstorage";
import { withTheme } from "@material-ui/styles";
import { goTo } from "react-chrome-extension-router";
import DashboardOffline from "./DashboardOffline";
import { auth } from "../firebase";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { parseUserFromLocalStorage } from "../utils";
import Dashboard from "./Dashboard";
import { CircularProgress } from "@material-ui/core";

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Login = ({ theme }) => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy();
  const [localUser, setLocalUser] = useStateWithCallbackLazy();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user, () => {
        setIsUserLoaded(true);
        if (!!user) goTo(Dashboard);
      });
    });

    const localUser = reactLocalStorage.get("user");
    setLocalUser(parseUserFromLocalStorage(localUser), () => {
      setIsLocalLoaded(true);
      if (!!localUser) goTo(DashboardOffline);
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
    goTo(DashboardOffline, { localUser });
  };

  return !isUserLoaded || !isLocalLoaded ? (
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

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </form>
  );
};

export default withTheme(Login);
