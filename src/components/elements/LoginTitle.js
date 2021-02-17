import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  title_h4_primary: {
    color: theme.palette.primary.main,
  },
  title_h4_secondary: {
    color: theme.palette.secondary.dark,
  },
}));

const LoginTitle = () => {
  const classes = useStyles();

  return (
    <Typography component="div" align="center">
      <Typography
        className={classes.title_h4_secondary}
        variant="h4"
        component="span"
        gutterBottom>
        YOUR
      </Typography>

      <Typography
        className={classes.title_h4_primary}
        variant="h4"
        component="span">
        {" "}
        <b>- BOARD</b>
      </Typography>
    </Typography>
  );
};

export default LoginTitle;
