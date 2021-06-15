import React, { useContext, useState } from "react";
import "../style/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const { setUser } = useContext(UserContext);

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
      request,
      { withCredentials: true }
    );
    const { login, user, err } = result.data;
    if (login) {
      setUser(user);
      history.push("/");
    } else if (err) setError(err);
    setLoader(false);
  };
  return (
    <>
      <div className="login">
        <div className="login-container ">
          <div className={`error box ${Error ? `` : `hidden`}`}>
            <div className="err-text">
              {Error}
              <button className="close" onClick={() => setError(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 0 24 24"
                  width="18px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              loginApi(e);
            }}
            className="login-form"
            method="post"
          >
            <div>
              <label htmlFor="password">Username or password</label>
              <input
                type="text"
                className="username light-blue"
                required
                id="login"
                name="login"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <a href="forgot password">Forgot Password?</a>
              <input
                type="password"
                className="password light-blue"
                required
                id="password"
                name="password"
              />
            </div>
            <div>
              <input
                type="submit"
                required
                name="submit"
                value={Loader ? `Signing in...` : `Sign in`}
                className={`register loginBtn${Loader ? `loadingBtn` : ``}`}
              />
            </div>
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
