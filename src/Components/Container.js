import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router";

export default function Content() {
  return (
    <div className="container">
      <Switch>
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
