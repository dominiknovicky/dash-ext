import React, { useState } from "react";
import { calcNextBirthday } from "../utils";
import { Typography, Fab, Menu, MenuItem, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";
import { goTo } from "react-chrome-extension-router";
import { getFirstName } from "../utils";
import theme from "../theme";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppWrapper from "./elements/AppWrapper";
import Login from "./Login";

const DashboardOffline = () => {
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const localUser = parseUserFromLocalStorage(reactLocalStorage.get("user"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutAndLeave = () => {
    reactLocalStorage.remove("user");
    goTo(Login);
  };

  return (
    <AppWrapper>
      <Typography color="primary" variant="h1" gutterBottom>
        Hello <b>{getFirstName(localUser?.name.toUpperCase())}</b>.
      </Typography>
      <Typography className={classes.title_s_dark} variant="h4">
        {calcNextBirthday(localUser?.dateOfBirth)}
      </Typography>

      {/* Settings */}
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
        key="fade-menu"
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}>
        <MenuItem
          onClick={logoutAndLeave}
          className={classes.title_s_dark}
          style={{ fontSize: 14, fontWeight: 500 }}>
          <ExitToAppIcon style={{ marginRight: 10, fontSize: 20 }} />
          <span style={{ textTransform: "uppercase" }}>Logout</span>
        </MenuItem>
      </Menu>
    </AppWrapper>
  );
};

export default DashboardOffline;
