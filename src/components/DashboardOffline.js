import React from "react";
import { calcNextBirthday } from "../utils";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";
import { getFirstName } from "../utils";

const DashboardOffline = ({ theme }) => {
  const useStyles = makeStyles(() => ({
    title_h1: {
      color: theme.palette.primary.main,
    },
    title_h4: {
      color: theme.palette.secondary.dark,
    },
  }));
  const classes = useStyles();
  const { localUser } = useAuth();

  console.log(localUser);

  return (
    localUser && (
      <>
        <span>Offline Dashboard</span>
        <span>{getFirstName(localUser.name)} </span>

        {/* <Typography variant="h1" gutterBottom className={classes.title_h1}>
        Hello <b>{userLocalStorage.name.toUpperCase()}</b>.
      </Typography>
      <Typography className={classes.title_h4} variant="h4">
        {calcNextBirthday(userLocalStorage)}
      </Typography> */}
      </>
    )
  );
};

export default withTheme(DashboardOffline);
