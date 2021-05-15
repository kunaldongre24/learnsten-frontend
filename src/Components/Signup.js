import React from "react";
import "../style/Signup.css";

function Signup() {
  return (
    <div>
      <form className="signup-form">
        <label for="password">Username or email address</label>
        <input
          type="text"
          className="username light-blue"
          required
          id="login"
          name="login"
        />
        <label for="password">Password</label>
        <a>Forgot Password?</a>
        <input
          type="password"
          className="password light-blue"
          required
          id="password"
          name="password"
        />
        <input
          type="submit"
          required
          name="submit"
          value="Login"
          className="loginBtn"
        />
      </form>
    </div>
  );
}

export default Signup;
