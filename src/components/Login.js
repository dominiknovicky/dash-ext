import React, { useEffect, useState, useContext } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { LoadingContext } from "../contexts/LoadingContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LoginTitle from "./elements/LoginTitle";
import Divider from "./elements/Divider";

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

const Login = ({
  handleSubmit,
  values,
  handleChange,
  dateOfBirth,
  setdateOfBirth,
}) => {
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy(null);
  const [isLoaded, setIsLoaded] = useContext(LoadingContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(!!user);
      setCurrentUser(currentUser, () => {
        setIsLoaded(true);
      });
    });
    return unsubscribe;
  }, []);

  return (
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

      <Divider text="or" />

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </form>
  );
};

export default Login;
