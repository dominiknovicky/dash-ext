import React from "react";
import { AppWrapper as Wrapper } from "../../styles/BasicStyles";
import theme from "../../theme";
import { ThemeProvider } from "@material-ui/core/styles";

const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{children}</Wrapper>
    </ThemeProvider>
  );
};

export default AppWrapper;
