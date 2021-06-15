import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/NewSchool.css";
import ClearIcon from "@material-ui/icons/Clear";
import SummaryBox from "./SummaryBox";
import { getSchoolByUserId } from "./Api";

function NewCourse(props) {
  const { username, executeScroll, c_id, c_school } = props;
  const [Error, setError] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [schools, setSchools] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    const getSchoolByUser = async () => {
      const schools = await getSchoolByUserId(c_id);
      setSchools(schools.data);
    };
    getSchoolByUser();
  }, [c_id]);

  useEffect(() => {
    executeScroll();
  }, [executeScroll]);
  const addSubjects = () => {
    const string = document.getElementById("subjects").value;
    const subject = string.replace(/\s+/g, " ").trim();

    var bool = false;
    subjects.map((data) => {
      if (data.toLowerCase() === subject.toLowerCase()) {
        bool = true;
      }
      return bool;
    });

    if (subject.trim().length > 0 && !bool) {
      setSubjects((oldArray) => [...oldArray, subject]);
      document.getElementById("subjects").value = "";
    } else if (bool) {
      setSubjectError("this subject is already in the list");
    }
  };
  const removeSubject = (data) => {
    setSubjects(subjects.filter((item) => item !== data));
  };
  const removeSubjectError = () => {
    setSubjectError("");
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      addSubjects();
    }
  };

  const createNewCourse = async (e) => {
    e.preventDefault();
    if (!document.getElementById("courseName").value.trim()) {
      setError("Course name cannot be empty.");
    } else if (!subjects.length) {
      setError("Add atleast one subject.");
    } else {
      setError("");
      setLoader(true);
      e.preventDefault();
      const request = {
        name: document.getElementById("courseName").value,
        description: document.getElementById("description").value,
        schoolId: document.querySelector('input[name="school"]:checked').value,
        subjects: subjects,
      };
      const result = await axios.post(
        "http://localhost:8000/api/v1/course/",
        request,
        { withCredentials: true }
      );
      const { message, err, schoolId } = result.data;
      if (err) setError(err);
      if (message) {
        if (message === "success") {
          console.log(schoolId);
        }
      }
      setLoader(false);
    }
  };
  return (
    <div className="NewSchool">
      <h1 className="shead">Create New Course</h1>
      <div className="sub-head">
        A course contains of all the videos, notes. You can create multiple
        courses for different subjects and add references and notes to them.
      </div>
      <div
        className={`error box ${Error ? `` : `hidden`}`}
        style={{ padding: "10px", marginBottom: "10px" }}
      >
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
      <form className="create-school-form" autoComplete="off" method="post">
        <div className="row">
          <span>
            <label htmlFor="owner">
              School <span className="req">*</span>
            </label>
            <SummaryBox
              text={username}
              menuDirection={"left"}
              listArray={schools}
              name="school"
              c_school={c_school}
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
              Course Name <span className="req">*</span>
            </label>
            <input
              type="text"
              className={`username light-blue`}
              id="courseName"
              name="courseName"
            />
          </span>
        </div>
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          className={`description light-blue`}
          id="description"
          name="description"
        />
        <label htmlFor="subjects">Subjects</label>

        <div className="subject-selector" id="subject-selector">
          <ul
            className="subject-list"
            style={
              subjects.length > 0
                ? { padding: "6px", paddingBottom: "10px" }
                : {}
            }
          >
            {subjects.map((data, i) => {
              return (
                <li key={i}>
                  <div style={{ display: "flex" }}>
                    {data}
                    <span
                      className="removeSubject"
                      onClick={() => removeSubject(data)}
                    >
                      <ClearIcon
                        style={{
                          height: "14px",
                          width: "14px",
                          marginTop: "3px",
                          marginLeft: "4px",
                          curson: "pointer",
                        }}
                      />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              className={`subjects light-blue`}
              id="subjects"
              name="subjects"
              onChange={removeSubjectError}
              onKeyPress={handleKeypress}
              placeholder="Enter subjects here..."
              style={{
                border: "none",
                margin: "0",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            />
            <button
              onClick={addSubjects}
              type="button"
              id="addSubject"
              className="addSubject"
            >
              Add Subject
            </button>
          </div>
        </div>
        <div className="helper">
          Major subjects/skills that will be taught in this course.
        </div>
        {subjectError ? (
          <span
            className={`messageBox ${
              subjectError ? `inputerror` : `inputmessage`
            }`}
          >
            <span className="arrow"></span>
            {subjectError}
          </span>
        ) : (
          ""
        )}
        <input
          type="button"
          onClick={createNewCourse}
          name={`Register`}
          value={Loader ? `Creating New School...` : `Create New School`}
          className={`register ${Loader ? `loadingBtn` : ``}`}
        />
      </form>
    </div>
  );
}

export default NewCourse;
