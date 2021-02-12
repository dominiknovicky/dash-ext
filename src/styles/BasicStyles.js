import styled from "styled-components";

export const AppWrapper = styled.div`
  background: ${({ color }) => color.default};
  width: 100%;
  height: 100vh;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
