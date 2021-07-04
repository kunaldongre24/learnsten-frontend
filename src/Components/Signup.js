import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/Signup.css";
import axios from "axios";

function Signup() {
  const [Loader, setLoader] = useState(false);
  const [Error, setError] = useState(false);
  const [UserValid, setUserValid] = useState({});
  const [EmailValid, setEmailValid] = useState({});
  const [PasswordValid, setPasswordValid] = useState({});

  const signupApi = async (e) => {
    setLoader(true);
    e.preventDefault();
    const request = {
      username: document.getElementById("login").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    const result = await axios.post(
      "http://localhost:8000/api/v1/auth/signup",
      request,
      { withCredentials: true }
    );
    const { err } = result.data;
    if (err) setError(err);

    setLoader(false);
  };
  const validateUsername = async (e) => {
    const request = { username: e.target.value };
    const result = await axios.post(
      "http://localhost:8000/api/v1/auth/validateusername",
      request,
      { withCredentials: true }
    );
    setUserValid(result.data);
  };
  const validateEmail = async (e) => {
    const request = { email: e.target.value };
    const result = await axios.post(
      "http://localhost:8000/api/v1/auth/validateemail",
      request,
      { withCredentials: true }
    );

    setEmailValid(result.data);
  };
  const validatePassword = (e) => {
    if (e.target.value.length > 5) {
      setPasswordValid({ valid: true });
    } else {
      setPasswordValid({
        valid: false,
        message: "Password should be atleast 6 characters long",
      });
    }
  };
  return (
    <div className="signup">
      <h1 className="shead">Create An Account</h1>
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
        className="signup-form"
        onSubmit={(e) => {
          signupApi(e);
        }}
        autoComplete="off"
      >
        <label htmlFor="password">
          Username <span className="req">*</span>
        </label>
        <input
          type="text"
          className={`username light-blue ${
            UserValid.username && !UserValid.valid ? `errfocus` : ``
          }`}
          required
          id="login"
          name="newlogin"
          onChange={validateUsername}
        />
        {UserValid.username ? (
          <span
            className={`messageBox ${
              UserValid.username && !UserValid.valid
                ? `inputerror`
                : `inputmessage`
            }`}
          >
            <span className="arrow"></span>
            {UserValid.message}
          </span>
        ) : (
          ""
        )}

        <label htmlFor="email">
          Email address <span className="req">*</span>
        </label>
        <input
          type="email"
          className={`email light-blue ${
            EmailValid.email && !EmailValid.valid ? `errfocus` : ``
          }`}
          required
          id="email"
          name="newemail"
          onChange={validateEmail}
        />
        {EmailValid.email ? (
          <span
            className={`messageBox ${
              EmailValid.email && !EmailValid.valid
                ? `inputerror`
                : `inputmessage`
            }`}
          >
            <span className="arrow"></span>
            {EmailValid.message}
          </span>
        ) : (
          ""
        )}

        <label htmlFor="password">
          Password <span className="req">*</span>
        </label>
        <input
          type="password"
          className={`password light-blue ${
            !PasswordValid.valid && PasswordValid.message ? `errfocus` : ``
          }`}
          required
          id="password"
          name="newpassword"
          onChange={validatePassword}
        />
        {PasswordValid.message ? (
          <span
            className={`messageBox ${
              !PasswordValid.valid ? `inputerror` : `inputmessage`
            }`}
          >
            <span className="arrow"></span>
            {PasswordValid.message}
          </span>
        ) : (
          ""
        )}
        <div className="terms">
          By clicking Sign Up, you agree to our <a href="/terms">Terms</a>,{" "}
          <a href="/data-policy">Data Policy</a> and{" "}
          <a href="/cookie-policy">Cookie Policy</a>. You may receive SMS
          notifications from us and can opt out at any time.
        </div>
        <input
          type="submit"
          required
          disabled={
            EmailValid.valid && UserValid.valid && PasswordValid.valid
              ? ``
              : `disabled`
          }
          name={`Register`}
          value={Loader ? `Signing up...` : `Sign up`}
          className={` register ${Loader ? `loadingBtn` : ``}`}
        />
      </form>
      <div className="box">
        Already a user ? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Signup;
