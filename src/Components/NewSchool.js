import React, { useState } from "react";
import axios from "axios";
import "../style/NewSchool.css";
import ProfileImage from "../images/wl.jpeg";
import SummaryBox from "./SummaryBox";

function NewSchool(props) {
  const { username } = props;
  const [nameValid, setNameValid] = useState({});
  const [Error, setError] = useState(false);
  const [Loader, setLoader] = useState(false);
  const validateName = async (e) => {
    const request = { name: e.target.value };
    const result = await axios.post(
      "http://localhost:8000/api/v1/auth/validatename",
      request,
      { withCredentials: true }
    );
    setNameValid(result.data);
  };
  const createNewSchool = async (e) => {
    setLoader(true);
    e.preventDefault();
    const request = {
      name: document.getElementById("schoolName").value,
      description: document.getElementById("description").value,
      privacy: document.querySelector('input[name="privacy"]:checked').value,
    };
    const result = await axios.post(
      "http://localhost:8000/api/v1/school/",
      request,
      { withCredentials: true }
    );
    const { message, err } = result.data;
    if (err) setError(err);
    if (message) {
      if (message === "success") {
        return props.history.push(`/${username}/school/`);
      }
    }
    setLoader(false);
  };
  return (
    <div className="NewSchool">
      <h1 className="shead">Create New School</h1>
      <div className="sub-head">
        A school contains of all the courses, including notes. You can create
        multiple schools for different subjects or one for all.
      </div>
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
        className="create-school-form"
        autoComplete="off"
        onSubmit={(e) => {
          createNewSchool(e);
        }}
        method="post"
      >
        <div className="row">
          <span>
            <label htmlFor="owner">
              Owner <span className="req">*</span>
            </label>
            <SummaryBox
              text={username}
              img={ProfileImage}
              menuDirection={"left"}
              modalHeader={"Change Owner"}
              style={{
                marginTop: "7px",
                height: "34px",
                borderColor: "#ccd0d5",
              }}
            />
          </span>
          <span className="of">{">"}</span>
          <span>
            <label htmlFor="schoolName">
              School Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className={`username light-blue  ${
                nameValid.name && !nameValid.valid ? `errfocus` : ``
              }`}
              required
              id="schoolName"
              onChange={validateName}
              name="schoolName"
            />
            {nameValid.name ? (
              <span
                className={`messageBox ${
                  nameValid.name && !nameValid.valid
                    ? `inputerror`
                    : `inputmessage`
                }`}
              >
                <span className="arrow"></span>
                {nameValid.message}
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          className={`email light-blue`}
          id="description"
          name="description"
        />
        <div className="privacy">
          <div className="flex">
            <input type="radio" value="0" name="privacy" defaultChecked />
            <div className="privacy-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
                fill="#666c74"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-.61.08-1.21.21-1.78L8.99 15v1c0 1.1.9 2 2 2v1.93C7.06 19.43 4 16.07 4 12zm13.89 5.4c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41C17.92 5.77 20 8.65 20 12c0 2.08-.81 3.98-2.11 5.4z" />
              </svg>
            </div>
            <div>
              <label htmlFor="public">Public</label>

              <div className="privacy-info">
                Anyone on the internet can this school, you choose who teach.
              </div>
            </div>
          </div>
          <div className="flex">
            <input type="radio" value="1" name="privacy" />
            <div className="privacy-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
                fill="#666c74"
              >
                <g fill="none">
                  <path d="M0 0h24v24H0V0z" />
                  <path d="M0 0h24v24H0V0z" opacity=".87" />
                </g>
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
              </svg>
            </div>
            <div>
              <label htmlFor="private">Private</label>
              <div className="privacy-info">
                You choose who can view and teach in your school.
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          required
          name={`Register`}
          value={Loader ? `Creating New School...` : `Create New School`}
          className={`register ${Loader ? `loadingBtn` : ``}`}
        />
      </form>
    </div>
  );
}

export default NewSchool;
