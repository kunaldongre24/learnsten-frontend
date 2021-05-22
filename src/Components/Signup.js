import React from "react";
import { Link } from "react-router-dom";
import "../style/Signup.css";

function Signup() {
  return (
    <div className="signup">
      <h1 className="shead">Create An Account</h1>
      <form className="signup-form">
        <label for="password">Username</label>
        <input
          type="text"
          className="username light-blue"
          required
          id="login"
          placeholder="Username"
          name="newlogin"
        />
        <label for="email">Email address</label>
        <input
          type="email"
          className="email light-blue"
          required
          id="email"
          placeholder="Email address"
          name="newemail"
        />
        <label for="password">Password</label>
        <input
          type="password"
          className="password light-blue"
          required
          id="password"
          placeholder="Password"
          name="newpassword"
        />
        <div className="terms">
          By clicking Sign Up, you agree to our <a>Terms</a>, <a>Data Policy</a>{" "}
          and <a>Cookie Policy</a>. You may receive SMS notifications from us
          and can opt out at any time.
        </div>
        <input
          type="submit"
          required
          name="Register"
          value="Sign Up"
          className="register"
        />
      </form>
      <div class="box">
        Already a user ? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
