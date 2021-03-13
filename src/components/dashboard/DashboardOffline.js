import React from "react";
import { calcNextBirthday } from "../../utils";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { reactLocalStorage } from "reactjs-localstorage";
import { parseUserFromLocalStorage } from "../../utils";
import { goTo } from "react-chrome-extension-router";
import { getFirstName } from "../../utils";
import theme from "../../theme";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AppWrapper from "../elements/AppWrapper";
import Login from "../Login";
import styled from "styled-components";
import { StyledFab } from "./DashboardStyles";

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
      <Typography
        color="primary"
        variant="h1"
        style={{ userSelect: "none", marginBottom: "15px" }}>
        Hello <b>{getFirstName(localUser?.name.toUpperCase())}</b>.
      </Typography>
      <Typography
        className={classes.title_s_dark}
        variant="h4"
        style={{ userSelect: "none" }}>
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
