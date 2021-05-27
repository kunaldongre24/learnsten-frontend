import React, { useState, useMemo } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import { Route, Switch } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "./UserContext";

export default function Content() {
  const [user, setUser] = useState({});
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="container">
      <Header />
      <UserContext.Provider value={providerValue}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/:username" component={Profile} />
          <Route path="/" component={Home} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
