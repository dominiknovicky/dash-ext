import React from "react";
import styled from "styled-components";

const DividerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  opacity: 0.25;
  height: 27.5px;
  margin-top: 10px;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border-top: 1px solid black;
`;

const Text = styled.span`
  padding: 0 10px;
  height: 100%;
`;

const Divider = ({ text }) => {
  return (
    <DividerWrapper>
      <HorizontalLine />
      <Text>{text}</Text>
      <HorizontalLine />
    </DividerWrapper>
  );
};

export default Divider;
