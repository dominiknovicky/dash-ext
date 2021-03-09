import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Tabs,
  Tab,
  Box,
  Fab,
  Fade,
  Menu,
  Button,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { goTo } from "react-chrome-extension-router";
import { auth } from "../firebase";
import { SettingsWrapper } from "../styles/BasicStyles";
import theme from "../theme";
import Login from "./Login";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  menu: {
    padding: "0 !important",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: 10,
  },
  logoutButton: {
    padding: 20,
  },
  tabPanel: {},
  fab: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
}));

const VerticalTabs = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutAndLeave = () => {
    auth.signOut();
    goTo(Login);
  };

  return (
    <>
      <Fab
        className={classes.fab}
        color="secondary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="medium">
        <SettingsIcon />
      </Fab>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        className={classes.menu}
        TransitionComponent={Fade}>
        <SettingsWrapper theme={theme}>
          <Tabs
            textColor="primary"
            indicatorColor="primary"
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            className={classes.tabs}>
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
            <Button
              className={classes.logoutButton}
              startIcon={<ExitToAppIcon />}
              color="primary"
              onClick={signOutAndLeave}>
              Logout
            </Button>
          </Tabs>
          <TabPanel className={classes.tabPanel} value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </SettingsWrapper>
      </Menu>
    </>
  );
};

export default VerticalTabs;
