import React, { useEffect, useState } from "react";
import { calcNextBirthday } from "../utils";
import { makeStyles } from "@material-ui/styles";
import { getFirstName } from "../utils";
import { CircularProgress } from "@material-ui/core";
import theme from "../theme";
import { Typography, Fab } from "@material-ui/core";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AppWrapper from "./elements/AppWrapper";
import { AppWrapper as Wrapper } from "../styles/BasicStyles";
import Settings from "./settings/Settings";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import { TransverseLoading } from "react-loadingg";
import { useStateWithCallbackLazy } from "use-state-with-callback";
const Dashboard = () => {
  const [user] = useAuthState(auth);

  const useStyles = makeStyles(() => ({
    title_s_dark: {
      color: theme.palette.secondary.dark,
    },
    fab: {
      position: "absolute",
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const { addToast } = useToasts();

  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy(null);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.email);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentUser(doc.data(), () => setLoading(false));
        } else {
          setCurrentUser(user, () => setLoading(false));
        }
      })
      .catch((error) => {
        addToast(error.message, {
          appearance: "error",
        });
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const createUserInFirebase = () => {
    setisSubmitted(true);
    const user = {
      displayName: currentUser.displayName,
      email: currentUser.email,
      dateOfBirth: JSON.stringify(dateOfBirth),
    };

    db.collection("users")
      .doc(currentUser.email)
      .set(user)
      .then(() => {
        addToast("Your account has been successfully created.", {
          appearance: "success",
          autoDismiss: true,
        });
        setisSubmitted(false);
      })
      .catch((error) => {
        addToast(error.message, {
          appearance: "error",
        });
        setisSubmitted(false);
      });
  };

  if (loading) {
    return (
      <Wrapper>
        <TransverseLoading color={theme.palette.primary.main} />
      </Wrapper>
    );
  }

  return (
    <AppWrapper>
      <Typography variant="h1" gutterBottom color="primary">
        Hello <b>{getFirstName(currentUser.displayName.toUpperCase())}</b>.
      </Typography>
      {!currentUser.hasOwnProperty("dateOfBirth") && (
        <>
          <Typography className={classes.title_s_dark} variant="h6">
            Please, enter your birth date to continue.
          </Typography>
          <InputContainer>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={isSubmitted}
                required
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
            {!isSubmitted && (
              <Fab
                disabled={
                  // eslint-disable-next-line eqeqeq
                  dateOfBirth === null || dateOfBirth == "Invalid Date"
                    ? true
                    : false
                }
                component="button"
                size="medium"
                style={{ marginLeft: 20 }}
                color="primary"
                aria-label="chevron-right"
                aria-haspopup="false"
                onClick={createUserInFirebase}>
                <ChevronRightRoundedIcon style={{ fontSize: 30 }} />
              </Fab>
            )}
            {isSubmitted && (
              <CircularProgress size={48} style={{ marginLeft: 20 }} />
            )}
          </InputContainer>
        </>
      )}
      {currentUser.hasOwnProperty("dateOfBirth") && (
        <Typography className={classes.title_s_dark} variant="h4">
          {calcNextBirthday(JSON.parse(currentUser.dateOfBirth))}
        </Typography>
      )}
      <Settings />
    </AppWrapper>
  );
};

export default Dashboard;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
