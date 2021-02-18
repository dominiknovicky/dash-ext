import React from "react";
import { calcNextBirthday } from "../utils";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = ({ theme }) => {
  // const useStyles = makeStyles(() => ({
  //   title_h1: {
  //     color: theme.palette.primary.main,
  //   },
  //   title_h4: {
  //     color: theme.palette.secondary.dark,
  //   },
  // }));
  // const classes = useStyles();
  // const { currentUser } = useAuth();

  return (
    <>
      <span>Online Dashboard </span>
      {/* <button onClick={() => signOut()}>Sign Out</button> */}
    </>
  );
};

export default Dashboard;
