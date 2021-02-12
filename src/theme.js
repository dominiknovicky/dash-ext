import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(241, 136, 97, 1)",
      main: "rgba(186, 89, 55, 1)",
      dark: "rgba(133, 44, 13, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(173, 227, 236, 1)",
      main: "rgba(124, 177, 186, 1)",
      dark: "rgba(77, 129, 138, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disable: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default theme;
