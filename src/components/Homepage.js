import React from "react";
import { AppWrapper } from "../styles/BasicStyles";
import { CircularProgress } from "@material-ui/core";

const Homepage = ({ children, isLoaded, theme }) => {
  return isLoaded ? (
    <AppWrapper color={theme.palette.background}>{children}</AppWrapper>
  ) : (
    <AppWrapper color={theme.palette.background}>
      <CircularProgress />
    </AppWrapper>
  );
};

export default Homepage;
