import styled from "styled-components";

// APP
export const AppWrapper = styled.div`
  background: #fafafa;
  width: 100%;
  height: 100vh;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

// SETTINGS WRAPPER
export const SettingsWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  display: flex;
  outline: none;
  width: 500px;
`;
