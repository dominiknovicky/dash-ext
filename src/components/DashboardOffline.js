import React, { useEffect, useState } from "react";
import { calcNextBirthday } from "../utils";
import {
  Typography,
  Button,
  Fab,
  Menu,
  MenuItem,
  Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";
import { popToTop } from "react-chrome-extension-router";
import { CircularProgress } from "@material-ui/core";
import { getFirstName } from "../utils";
import { AppWrapper } from "../styles/BasicStyles";
import theme from "../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";

const DashboardOffline = () => {
  const useStyles = makeStyles(() => ({
    title_h1: {
      color: theme.palette.primary.main,
    },
    title_h4: {
      color: theme.palette.secondary.dark,
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  const [localUser, setLocalUser] = useStateWithCallbackLazy();
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const localUser = reactLocalStorage.get("user");
    setLocalUser(parseUserFromLocalStorage(localUser), () =>
      setIsLocalLoaded(true)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutAndLeave = () => {
    reactLocalStorage.remove("user");
    popToTop();
  };

  return isLocalLoaded ? (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Typography variant="h1" gutterBottom className={classes.title_h1}>
          Hello <b>{getFirstName(localUser.name.toUpperCase())}</b>.
        </Typography>
        <Typography className={classes.title_h4} variant="h4">
          {calcNextBirthday(localUser)}
        </Typography>

        <Fab
          className={classes.fab}
          color="secondary"
          aria-label="add"
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
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem> */}
          <MenuItem onClick={logoutAndLeave}>Logout</MenuItem>
        </Menu>
      </AppWrapper>
    </ThemeProvider>
  ) : (
    <CircularProgress />
  );
};

export default DashboardOffline;
