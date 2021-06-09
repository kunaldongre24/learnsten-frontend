import React, { useState, useMemo } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import { Route, Switch } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "./UserContext";
import PrivateRoute from "./PrivateRoute";
import SchoolView from "./SchoolView";

export default function Content() {
  const [user, setUser] = useState({});
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="container">
      <UserContext.Provider value={providerValue}>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/explore" component={Home} />
          <PrivateRoute path="/subjects" component={Home} />
          <PrivateRoute path="/groups" component={Home} />
          <PrivateRoute path="/trending" component={Home} />
          <PrivateRoute path="/school/:schoolId" component={SchoolView} />
          <PrivateRoute path="/:username" component={Profile} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
