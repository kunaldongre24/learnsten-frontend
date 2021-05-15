import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div class="abt">
      <h1>Welcome to Learnsten</h1>
      <div class="details">
        Learnsten is an online platform that connects people helping you learn
        and teach your friends and anyone on the platform.
        <div className="mt15">
          Teaching is the best way to learn, you can open public or private
          schools and teach your friends or anyone.
        </div>
        <div className="mt15">
          You can currently use learnsten to:
          <ul>
            <li>
              Search for people you know and follow them and Join their schools
            </li>
            <li>Look up for what you friends teaching</li>
            <li>Open your own school and teach of anything of your interest</li>
            <li>See the visualization of what you have learnt and taught</li>
            <li>And a lot more</li>
          </ul>
        </div>
        <div className="mt15">
          To get started click below to register, if already registered, you can
          login.
        </div>
        <div className="mt15 center">
          <Link to="/login/signup" className="signup mr10">
            Signup
          </Link>
          <a href="#login" className="signup">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
