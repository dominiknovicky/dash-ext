import React, { useEffect, useState } from "react";
import { calcNextBirthday } from "../utils";
import { makeStyles } from "@material-ui/styles";
import { getFirstName } from "../utils";
import { popToTop } from "react-chrome-extension-router";
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
import firebase from "../firebase";
import AppWrapper from "./elements/AppWrapper";

const Dashboard = ({ user }) => {
  const useStyles = makeStyles(() => ({
    title_p_main: {
      color: theme.palette.primary.main,
    },
    title_s_dark: {
      color: theme.palette.secondary.dark,
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
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

  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [currentUser, setCurrentUser] = useStateWithCallbackLazy();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const docRef = firebase.firestore().collection("users").doc(user.email);
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
        console.log("Error getting document:", error);
        setIsLoaded(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutAndLeave = () => {
    firebase.auth().signOut();
    popToTop();
  };

  const createUserInFirebase = () => {
    setisSubmitted(true);
    const user = {
      displayName: currentUser.displayName,
      email: currentUser.email,
      dateOfBirth,
    };

    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.email)
      .set(user)
      .then(() => {
        console.log("Success");
        setisSubmitted(false);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setisSubmitted(false);
      });
  };

  return currentUser && isLoaded ? (
    <AppWrapper>
      <Typography variant="h1" gutterBottom className={classes.title_p_main}>
        Hello <b>{currentUser && getFirstName(currentUser.displayName)}</b>.
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
          {calcNextBirthday(currentUser.dateOfBirth.seconds)}
        </Typography>
      )}
      <Fab
        className={classes.fab}
        color="secondary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}>
        <SettingsIcon />
      </Fab>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        {/* <MenuItem
            className={classes.title_s_dark}
            // onClick={signOutAndLeave}
            style={{ fontSize: 14, fontWeight: 500 }}>
            <AccountCircleIcon style={{ marginRight: 10, fontSize: 20 }} />
            <span style={{ textTransform: "uppercase" }}>Profile</span>
          </MenuItem> */}
        <MenuItem
          onClick={signOutAndLeave}
          className={classes.title_s_dark}
          style={{ fontSize: 14, fontWeight: 500 }}>
          <ExitToAppIcon style={{ marginRight: 10, fontSize: 20 }} />
          <span style={{ textTransform: "uppercase" }}>Logout</span>
        </MenuItem>
      </Menu>
    </AppWrapper>
  ) : (
    <AppWrapper>
      <CircularProgress />
    </AppWrapper>
  );
};

export default Dashboard;
