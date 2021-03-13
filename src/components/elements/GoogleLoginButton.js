import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const GoogleLoginButton = ({ onClick }) => {
  return (
    <StyledButton
      onClick={onClick}
      size="small"
      color="primary"
      variant="outlined"
      startIcon={<FontAwesomeIcon size="lg" icon={faGoogle} />}>
      Sign in with Google
    </StyledButton>
  );
};

export default GoogleLoginButton;

const StyledButton = styled(Button)`
  padding: 10px !important;
  margin-top: 15px !important;

  > .MuiButton-label > .MuiButton-startIcon {
    margin-right: 15px !important;
  }
`;
