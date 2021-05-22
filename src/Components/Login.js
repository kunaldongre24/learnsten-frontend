import React, { useState } from "react";
import "../style/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [Loader, setLoader] = useState(false);
  const [Error, setError] = useState(false);
  const loginApi = async (e) => {
    setLoader(true);
    e.preventDefault();
    const request = {
      user: document.getElementById("login").value,
      password: document.getElementById("password").value,
    };
    const result = await axios.post(
      "http://localhost:8000/api/v1/auth/login",
      request
    );

    if (result.data.message) console.log(result.data.message);
    else if (result.data.err) console.log(result.data.err);
    else console.log(result.data);
    setLoader(false);
  };
  return (
    <>
      <div className="login">
        <div className="login-container ">
          <div className="error box">Login or username incorrect.</div>
          <form
            onSubmit={(e) => {
              loginApi(e);
            }}
            className="login-form"
            method="post"
          >
            <label htmlFor="password">Username or email address</label>
            <input
              type="text"
              className="username light-blue"
              required
              id="login"
              name="login"
            />
            <label htmlFor="password">Password</label>
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
              value={Loader ? `Signing in...` : `Sign in`}
              className={`register ${Loader ? `loadingBtn` : ``}`}
            />
          </form>
          <div className="box">
            New to Learnsten? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
