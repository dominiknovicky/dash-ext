import React, { useEffect, useState } from "react";
import {
  calcNextBirthday,
  isDayOfBirthChanged,
  getFirstName,
} from "../../utils";
import theme from "../../theme";
import { Typography, Fab, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ChevronRightRounded, ExitToApp } from "@material-ui/icons";
import AppWrapper from "../elements/AppWrapper";
import { AppWrapper as Wrapper } from "../../styles/BasicStyles";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useToasts } from "react-toast-notifications";
import { TransverseLoading } from "react-loadingg";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import Login from "../Login";
import { goTo } from "react-chrome-extension-router";
import Transition from "../elements/Transition";
import DatePicker from "../elements/DatePicker";
import {
  InputContainer,
  StyledFab,
  InputContainerAbsolute,
} from "./DashboardStyles";

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
      {/* Hello EXAMPLE */}
      <Transition>
        <Typography
          style={{ userSelect: "none", marginBottom: "15px" }}
          variant="h1"
          color="primary">
          Hello <b>{getFirstName(currentUser.displayName.toUpperCase())}</b>.
        </Typography>
      </Transition>

      {!currentUser.hasOwnProperty("dateOfBirth") && (
        <>
          <Transition>
            <Typography
              style={{ userSelect: "none" }}
              className={classes.title_s_dark}
              variant="h6">
              Please, enter your birth date to continue.
            </Typography>
          </Transition>

          <Transition>
            <InputContainer>
              <DateOfBirth
                disabled={isSubmitted}
                value={dateOfBirth}
                onChange={setdateOfBirth}
              />

              {!isSubmitted && (
                <FabComponent
                  disabled={
                    // eslint-disable-next-line eqeqeq
                    dateOfBirth === null || dateOfBirth == "Invalid Date"
                  }
                  onClick={createUserInFirebase}
                />
              )}
              {isSubmitted && (
                <CircularProgress size={48} style={{ marginLeft: 20 }} />
              )}
            </InputContainer>
          </Transition>
        </>
      )}

      {/* XYZ Days Until Your Birthday */}
      {currentUser.hasOwnProperty("dateOfBirth") && (
        <div style={{ position: "relative" }}>
          <Transition>
            <Typography
              style={{ userSelect: "none", cursor: "pointer" }}
              onClick={() => setChangeDayOfBirth(!changeDayOfBirth)}
              className={classes.title_s_dark}
              variant="h4">
              {calcNextBirthday(JSON.parse(currentUser.dateOfBirth))}
            </Typography>

            {changeDayOfBirth && (
              <InputContainerAbsolute>
                <DateOfBirth
                  disabled={isSubmitted}
                  value={dateOfBirth}
                  onChange={setdateOfBirth}
                  label="Change Date of Birth"
                />

                {!isSubmitted && (
                  <FabComponent
                    disabled={
                      isDayOfBirthChanged(dateOfBirth, currentUser) ||
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
              </InputContainerAbsolute>
            )}
          </Transition>
        </div>
      )}

      {/* EXIT APP */}
      <ExitApp onClick={signOutAndLeave} />
    </AppWrapper>
  );
};

export default Dashboard;

const DateOfBirth = ({
  isSubmitted,
  value,
  onChange,
  label = "Date of Birth",
}) => (
  <DatePicker
    disabled={isSubmitted}
    required
    disableFuture
    inputVariant="outlined"
    id="dateOfBirth"
    label={label}
    value={value}
    onChange={onChange}
  />
);

const ExitApp = ({ onClick }) => (
  <StyledFab
    color="secondary"
    aria-controls="fade-menu"
    aria-haspopup="true"
    onClick={onClick}
    size="medium">
    <ExitToApp />
  </StyledFab>
);

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
    <ChevronRightRounded style={{ fontSize: 30 }} />
  </Fab>
);
