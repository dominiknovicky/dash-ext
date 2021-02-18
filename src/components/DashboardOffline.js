import React from "react";
import { calcNextBirthday } from "../utils";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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

  return (
    <>
      <span>Offline Dashboard</span>

      {/* <Typography variant="h1" gutterBottom className={classes.title_h1}>
        Hello <b>{userLocalStorage.name.toUpperCase()}</b>.
      </Typography>
      <Typography className={classes.title_h4} variant="h4">
        {calcNextBirthday(userLocalStorage)}
      </Typography> */}
    </>
  );
};

export default DashboardOffline;
