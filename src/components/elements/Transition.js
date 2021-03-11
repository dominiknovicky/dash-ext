import React from "react";
import { CSSTransitionGroup } from "react-transition-group";

const Transition = ({ children }) => {
  return (
    <CSSTransitionGroup
      transitionName="trans-component"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      {children}
    </CSSTransitionGroup>
  );
};

export default Transition;
