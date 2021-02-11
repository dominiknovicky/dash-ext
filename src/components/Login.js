import React from "react";
import { calcNextBirthday } from "../utils";

const Login = ({ userLocalStorage }) => {
  return (
    <div>
      <div>{userLocalStorage.name}</div>
      <div>{calcNextBirthday(userLocalStorage)}</div>
    </div>
  );
};

export default Login;
