import React from "react";
import styled from "styled-components";
import theme from "../../theme";

const Divider = ({ text }) => {
  return (
    <DividerWrapper>
      <HorizontalLine />
      <Text theme={theme}>{text}</Text>
      <HorizontalLine />
    </DividerWrapper>
  );
};

export default Divider;

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 27.5px;
  margin-top: 10px;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border-top: 1px solid #000;
  opacity: 0.1;
`;

const Text = styled.span`
  padding: 0 10px;
  height: 100%;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 500;
`;
