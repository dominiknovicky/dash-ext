import React from "react";
import { AppWrapper as Wrapper } from "../../styles/BasicStyles";
import theme from "../../theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { CSSTransitionGroup } from "react-transition-group";

const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSTransitionGroup
        transitionName="trans-component"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <Wrapper>{children}</Wrapper>
      </CSSTransitionGroup>
    </ThemeProvider>
  );
};

export default AppWrapper;
