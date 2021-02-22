import React, { useEffect } from "react";
import { calcNextBirthday } from "../utils";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useAuth, signOut } from "../contexts/AuthContext";
import { withTheme } from "@material-ui/core/styles";
import { getFirstName } from "../utils";
import { auth } from "../firebase";
import { popToTop } from "react-chrome-extension-router";
import Login from "./Login";

const Dashboard = ({ theme, currentUser }) => {
  const useStyles = makeStyles(() => ({
    title_h1: {
      color: theme.palette.primary.main,
    },
    title_h4: {
      color: theme.palette.secondary.dark,
    },
  }));
  const classes = useStyles();

  const signOutAndLeave = () => {
    auth.signOut();
    popToTop();
  };

  return (
    <>
      <span>Online Dashboard </span>
      <span>{currentUser && getFirstName(currentUser.displayName)} </span>
      <button onClick={signOutAndLeave}>Sign Out</button>
    </>
  );
};

export default withTheme(Dashboard);
