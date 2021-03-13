import React from "react";
import { AppWrapper as Wrapper } from "../../styles/BasicStyles";
import theme from "../../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Transition from "./Transition";

const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Transition>
        <Wrapper>{children}</Wrapper>
      </Transition>
    </ThemeProvider>
  );
};

export default AppWrapper;
