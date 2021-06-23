import React, { useState, useMemo } from "react";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import UserRedirect from "./UserRedirect";
import { Switch } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import { UserContext } from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import SchoolView from "./SchoolView";

export default function Content() {
  const [user, setUser] = useState({});
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div className="container">
      <UserContext.Provider value={providerValue}>
        <Header />
        <Switch>
          <UserRedirect path="/login" component={Login} />
          <UserRedirect path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/explore" component={Home} />
          <ProtectedRoute path="/subjects" component={Home} />
          <ProtectedRoute path="/groups" component={Home} />
          <ProtectedRoute path="/trending" component={Home} />
          <ProtectedRoute path="/school/:schoolId" component={SchoolView} />
          <ProtectedRoute path="/:username" component={Profile} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
