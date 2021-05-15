import React from "react";
import { Route } from "react-router-dom";
import Signup from "./Signup";
import About from "./About";
import "../style/MainPage.css";

function MainPage() {
  return (
    <div className="mainpage">
      <Route path="/login/signup" exact component={Signup} />
      <Route path="/login" exact component={About} />
    </div>
  );
}

export default MainPage;
