import React from "react";
import "../style/Login.css";
import MainPage from "./MainPage";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login">
        <div className="login-container navigation-bar">
          <div className="error box">Login or username incorrect.</div>
          <form className="login-form">
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
          <div class="box">
            New to Learnsten? <Link to="/login/signup">Create an account</Link>
          </div>
        </div>
        <MainPage />
      </div>
    </>
  );
}

export default Login;
