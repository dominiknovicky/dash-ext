import styled from "styled-components";
import { Fab, Accordion } from "@material-ui/core";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const InputContainerAbsolute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
`;

export const StyledFab = styled(Fab)`
  position: absolute !important;
  left: 20px !important;
  bottom: 20px !important;
`;

export const StyledAccordion = styled(Accordion)`
  box-shadow: none !important;
  background-color: transparent !important;

  ::before {
    display: none;
  }
`;
