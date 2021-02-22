import React, { useEffect, useState } from "react";
import { calcNextBirthday } from "../utils";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withTheme } from "@material-ui/core/styles";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";
import { popToTop } from "react-chrome-extension-router";

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
  const [localUser, setLocalUser] = useStateWithCallbackLazy();
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);

  useEffect(() => {
    const localUser = reactLocalStorage.get("user");
    setLocalUser(parseUserFromLocalStorage(localUser), () =>
      setIsLocalLoaded(true)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOutAndLeave = () => {
    reactLocalStorage.remove("user");
    popToTop();
  };

  return isLocalLoaded ? (
    <>
      <Typography variant="h1" gutterBottom className={classes.title_h1}>
        Hello <b>{localUser.name.toUpperCase()}</b>.
      </Typography>
      <Typography className={classes.title_h4} variant="h4">
        {calcNextBirthday(localUser)}
      </Typography>
      <Button onClick={signOutAndLeave}>Sign Out</Button>
    </>
  ) : null;
};

export default withTheme(DashboardOffline);
