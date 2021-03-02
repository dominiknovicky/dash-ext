import React, { useEffect, useState, useContext } from "react";
import { calcNextBirthday } from "../utils";
import { Typography, Fab, Menu, MenuItem, Fade } from "@material-ui/core";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { LoadingContext } from "../contexts/LoadingContext";

const DashboardOffline = () => {
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
  }));
  const classes = useStyles();
  const [localUser, setLocalUser] = useStateWithCallbackLazy();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [isLoaded, setIsLoaded] = useContext(LoadingContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const localUser = reactLocalStorage.get("user");
    setLocalUser(parseUserFromLocalStorage(localUser), () => setIsLoaded(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutAndLeave = () => {
    reactLocalStorage.remove("user");
    popToTop();
  };

  return isLoaded && localUser ? (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Typography variant="h1" gutterBottom className={classes.title_p_main}>
          Hello <b>{getFirstName(localUser.name.toUpperCase())}</b>.
        </Typography>
        <Typography className={classes.title_s_dark} variant="h4">
          {calcNextBirthday(localUser.dateOfBirth)}
        </Typography>
        <Fab
          className={classes.fab}
          color="secondary"
          aria-label="add"
          aria-controls="fade-menu"
          aria-haspopup="true"
          size="medium"
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
            // onClick={logoutAndLeave}
            style={{ fontSize: 14, fontWeight: 500 }}>
            <AccountCircleIcon style={{ marginRight: 10, fontSize: 20 }} />
            <span style={{ textTransform: "uppercase" }}>Profile</span>
          </MenuItem> */}
          <MenuItem
            onClick={logoutAndLeave}
            className={classes.title_s_dark}
            style={{ fontSize: 14, fontWeight: 500 }}>
            <ExitToAppIcon style={{ marginRight: 10, fontSize: 20 }} />
            <span style={{ textTransform: "uppercase" }}>Logout</span>
          </MenuItem>
        </Menu>
      </AppWrapper>
    </ThemeProvider>
  ) : (
    <CircularProgress />
  );
};

export default DashboardOffline;
