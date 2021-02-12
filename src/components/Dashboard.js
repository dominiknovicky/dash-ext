import React from "react";
import { calcNextBirthday } from "../utils";
import { Typography } from "@material-ui/core";

const Login = ({ userLocalStorage }) => {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Hello {userLocalStorage.name.toUpperCase()}.
      </Typography>
      <Typography variant="h4">{calcNextBirthday(userLocalStorage)}</Typography>
    </>
  );
};

export default Login;
