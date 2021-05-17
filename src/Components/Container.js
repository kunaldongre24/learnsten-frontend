import React from "react";
import Home from "./Home";
import Profile from "./Profile";
import Header from "./Header";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router";
import Login from "./Login";

export default function Content() {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
