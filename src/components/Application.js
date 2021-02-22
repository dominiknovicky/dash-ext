import React, { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { reactLocalStorage } from "reactjs-localstorage";
import Login from "./Dashboard";
import Dashboard from "./Dashboard";
import DashboardOffline from "./DashboardOffline";
import { useAuth } from "../contexts/AuthContext";
import { Link, goBack, goTo, popToTop } from "react-chrome-extension-router";
import { parseUserFromLocalStorage } from "../utils";

const Application = ({ theme }) => {
  const { currentUser } = useAuth();
  const [userLocalStorage, setUserLocalStorage] = useStateWithCallbackLazy(
    null
  );

  useEffect(() => {
    // if (!!currentUser) goTo(Dashboard, { theme });

    let user = reactLocalStorage.get("user");
    user = parseUserFromLocalStorage(user);
    if (!!user) goTo(DashboardOffline, { theme });

    goTo(Login, { theme });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>test</div>;
};

export default Application;
