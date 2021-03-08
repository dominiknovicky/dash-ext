import React, { useEffect, useState, useContext } from "react";
import { calcNextBirthday } from "../utils";
import { makeStyles } from "@material-ui/styles";
import { getFirstName } from "../utils";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { CircularProgress } from "@material-ui/core";
import theme from "../theme";
import { Typography, Fab, Menu, MenuItem, Fade } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { db } from "../firebase";
import AppWrapper from "./elements/AppWrapper";
import { LoadingContext } from "../contexts/LoadingContext";
import { useToasts } from "react-toast-notifications";
import Settings from "./Settings";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);

  const useStyles = makeStyles(() => ({
    title_p_main: {
      color: theme.palette.primary.main,
    },
    title_s_dark: {
      color: theme.palette.secondary.dark,
    },
    fab: {
      position: "absolute",
      left: theme.spacing(2),
      bottom: theme.spacing(2),
    },
    inputWrapper: {
      display: "flex",
      alignItems: "center",
      marginTop: 10,
    },
    sendIcon: {
      fontSize: 30,
    },
    fabSend: {
      marginLeft: 20,
    },
  }));
  const classes = useStyles();
  const { addToast } = useToasts();

  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy();
  const [isSubmitted, setisSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useContext(LoadingContext);

  useEffect(() => {
    const docRef = db.collection("users").doc(user.email);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentUser(doc.data(), () => {
            setIsLoaded(true);
          });
        } else {
          setCurrentUser(user, () => {
            setIsLoaded(true);
          });
        }
      })
      .catch((error) => {
        addToast(error.message, {
          appearance: "error",
        });
        setIsLoaded(true);
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

  return currentUser && isLoaded ? (
    <AppWrapper>
      <Typography variant="h1" gutterBottom className={classes.title_p_main}>
        Hello{" "}
        <b>
          {currentUser && getFirstName(currentUser.displayName.toUpperCase())}
        </b>
        .
      </Typography>
      {!currentUser.dateOfBirth && (
        <>
          <Typography className={classes.title_s_dark} variant="h6">
            Please, enter your birth date to continue.
          </Typography>
          <div className={classes.inputWrapper}>
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
                disabled={dateOfBirth ? false : true}
                component="button"
                size="medium"
                className={classes.fabSend}
                color="primary"
                aria-label="chevron-right"
                aria-haspopup="false"
                onClick={createUserInFirebase}>
                <ChevronRightRoundedIcon className={classes.sendIcon} />
              </Fab>
            )}
            {isSubmitted && (
              <CircularProgress size={48} className={classes.fabSend} />
            )}
          </div>
        </>
      )}
      {currentUser.dateOfBirth && (
        <Typography className={classes.title_s_dark} variant="h4">
          {calcNextBirthday(JSON.parse(currentUser.dateOfBirth))}
        </Typography>
      )}
      <Settings />
    </AppWrapper>
  ) : (
    <AppWrapper>
      <CircularProgress />
    </AppWrapper>
  );
};

export default Dashboard;
