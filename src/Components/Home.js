import React from "react";
import { Route, Switch } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ActivityFeed from "./ActivityFeed";
import Explore from "./Explore";

export default function Home() {
  return (
    <div className="sidebar-all home">
      <div className="content">
        <Header />
        <Sidebar />
        <div className="home-container">
          <Switch>
            <Route path="/" exact component={ActivityFeed} />
            <Route path="/explore" component={Explore} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
