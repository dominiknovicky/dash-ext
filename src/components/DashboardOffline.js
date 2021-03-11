import React from "react";
import { calcNextBirthday } from "../utils";
import { Typography, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../utils";
import { goTo } from "react-chrome-extension-router";
import { getFirstName } from "../utils";
import theme from "../theme";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppWrapper from "./elements/AppWrapper";
import Login from "./Login";
import styled from "styled-components";

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
  const localUser = parseUserFromLocalStorage(reactLocalStorage.get("user"));

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

      <StyledFab
        color="secondary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={logoutAndLeave}
        size="medium">
        <ExitToAppIcon />
      </StyledFab>
    </AppWrapper>
  );
};

export default DashboardOffline;

const StyledFab = styled(Fab)`
  position: absolute !important;
  left: 20px !important;
  bottom: 20px !important;
`;
