import React, { useState } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { reactLocalStorage } from "reactjs-localstorage";
import { goTo } from "react-chrome-extension-router";
import Divider from "./elements/Divider";
import LoginTitle from "./elements/LoginTitle";
import { auth, provider } from "../firebase";
import GoogleLoginButton from "./elements/GoogleLoginButton";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import AppWrapper from "./elements/AppWrapper";
import Dashboard from "./dashboard/Dashboard";
import DashboardOffline from "./dashboard/DashboardOffline";

const Login = () => {
  const [values, setValues] = useState({
    firstName: "",
  });
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const { addToast } = useToasts();

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
    auth
      .signInWithPopup(provider)
      .then(() => goTo(Dashboard))
      .catch((error) =>
        addToast(error.message, {
          appearance: "error",
        })
      );
  };

  return (
    <AppWrapper>
      <FormContainer onSubmit={handleSubmit}>
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
            disabled={
              values.firstName === "" ||
              // eslint-disable-next-line eqeqeq
              dateOfBirth === null ||
              dateOfBirth == "Invalid Date"
                ? true
                : false
            }
            variant="contained"
            color="primary"
            type="submit">
            Submit
          </Button>
        </FormControl>

        <Divider text="or" />
        <GoogleLoginButton onClick={signIn} key="example" id="example" />
      </FormContainer>
    </AppWrapper>
  );
};

export default Login;

const FormContainer = styled.form`
  flex-direction: column;
  display: flex;
  max-width: 300px;
  width: 100%;
`;
