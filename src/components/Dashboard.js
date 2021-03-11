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
import { db } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import { TransverseLoading } from "react-loadingg";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Login from "./Login";
import { goTo } from "react-chrome-extension-router";
import moment from "moment";

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
  const [changeDayOfBirth, setChangeDayOfBirth] = useState(false);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.email);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentUser(doc.data(), () => setLoading(false));
          setdateOfBirth(JSON.parse(doc.data().dateOfBirth));
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

  const isDayOfBirthChanged = () => {
    return (
      moment(dateOfBirth).format("YYYY-MM-DD") ===
      moment(JSON.parse(currentUser.dateOfBirth)).format("YYYY-MM-DD")
    );
  };

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

  const updateDateOfBirth = () => {
    setisSubmitted(true);

    db.collection("users")
      .doc(currentUser.email)
      .update({ dateOfBirth: JSON.stringify(dateOfBirth) })
      .then(() => {
        addToast("Date of birth has been successfully updated.", {
          appearance: "success",
          autoDismiss: true,
        });
        setisSubmitted(false);
        setChangeDayOfBirth(false);
      })
      .catch((error) => {
        addToast(error.message, {
          appearance: "error",
        });
        setisSubmitted(false);
      });
  };

  const signOutAndLeave = () => {
    auth.signOut();
    goTo(Login);
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
      <Typography
        style={{ userSelect: "none" }}
        variant="h1"
        gutterBottom
        color="primary">
        Hello <b>{getFirstName(currentUser.displayName.toUpperCase())}</b>.
      </Typography>
      {(!currentUser.hasOwnProperty("dateOfBirth") || changeDayOfBirth) && (
        <>
          <Typography
            style={{ userSelect: "none" }}
            className={classes.title_s_dark}
            variant="h6">
            {changeDayOfBirth ? (
              <span>
                Please, enter your birth date to continue or{" "}
                <GoBack onClick={() => setChangeDayOfBirth(false)}>
                  go back
                </GoBack>
                .
              </span>
            ) : (
              "Please, enter your birth date to continue."
            )}
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

            {!isSubmitted && !changeDayOfBirth && (
              <FabComponent
                disabled={
                  // eslint-disable-next-line eqeqeq
                  dateOfBirth === null || dateOfBirth == "Invalid Date"
                }
                onClick={createUserInFirebase}
              />
            )}
            {!isSubmitted && changeDayOfBirth && (
              <FabComponent
                disabled={
                  isDayOfBirthChanged() ||
                  dateOfBirth === null ||
                  // eslint-disable-next-line eqeqeq
                  dateOfBirth == "Invalid Date"
                }
                onClick={updateDateOfBirth}
              />
            )}
            {isSubmitted && (
              <CircularProgress size={48} style={{ marginLeft: 20 }} />
            )}
          </InputContainer>
        </>
      )}

      {currentUser.hasOwnProperty("dateOfBirth") && !changeDayOfBirth && (
        <Typography
          style={{ userSelect: "none" }}
          onDoubleClick={() => setChangeDayOfBirth(true)}
          className={classes.title_s_dark}
          variant="h4">
          {calcNextBirthday(JSON.parse(currentUser.dateOfBirth))}
        </Typography>
      )}

      <StyledFab
        color="secondary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={signOutAndLeave}
        size="medium">
        <ExitToAppIcon />
      </StyledFab>
    </AppWrapper>
  );
};

export default Dashboard;

const FabComponent = ({ disabled, onClick }) => (
  <Fab
    disabled={disabled}
    component="button"
    size="medium"
    style={{ marginLeft: 20 }}
    color="primary"
    aria-label="chevron-right"
    aria-haspopup="false"
    onClick={onClick}>
    <ChevronRightRoundedIcon style={{ fontSize: 30 }} />
  </Fab>
);

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const StyledFab = styled(Fab)`
  position: absolute !important;
  left: 20px !important;
  bottom: 20px !important;
`;

const GoBack = styled.u`
  cursor: pointer;
`;
