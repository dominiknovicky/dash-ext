import React from "react";
import {
  Tabs,
  Tab,
  Fab,
  Fade,
  Menu,
  CircularProgress,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { auth, db } from "../../firebase";
import { SettingsWrapper } from "../../styles/BasicStyles";
import theme from "../../theme";
import Profile from "./Profile";
import styled from "styled-components";
import TabPanel from "./TabPanel";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Settings = () => {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [user, userLoading] = useAuthState(auth);
  const [userDetail, userDetailLoading] = useDocument(
    user && db.collection("users").doc(user.email)
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (userLoading || userDetailLoading) {
    return (
      <CircularProgressContainer>
        <Fab disabled color="secondary" size="medium">
          <SettingsIcon />
        </Fab>
        <StyledCircularProgress size={58} />
      </CircularProgressContainer>
    );
  }
  return (
    <>
      <StyledFab
        color="secondary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="medium">
        <SettingsIcon />
      </StyledFab>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        style={{ padding: "0 !important" }}
        TransitionComponent={Fade}>
        <SettingsWrapper theme={theme}>
          <StyledTabs
            textColor="primary"
            indicatorColor="primary"
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}>
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </StyledTabs>
          <TabPanel value={value} index={0}>
            <Profile user={userDetail.data()} />
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

export default Settings;

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const StyledTabs = styled(Tabs)`
  border-right: 1px solid ${theme.palette.divider};
  padding-top: 10px;
  height: 100% !important;
`;

const StyledFab = styled(Fab)`
  position: absolute !important;
  left: 20px !important;
  bottom: 20px !important;
`;

const CircularProgressContainer = styled.div`
  position: absolute !important;
  left: 20px !important;
  bottom: 20px !important;

  > button {
    :disabled {
      background-color: ${theme.palette.secondary.main};
      color: white;
    }
  }
`;

const StyledCircularProgress = styled(CircularProgress)`
  color: ${theme.palette.primary.main};
  position: absolute !important;
  left: -5px !important;
  bottom: -5px !important;
`;
