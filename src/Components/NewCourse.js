import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/NewSchool.css";
import ClearIcon from "@material-ui/icons/Clear";
import SummaryBox from "./SummaryBox";
import "../style/NewCourse.css";
import { suggestSubject } from "./Api";
import GetUser from "./UserContext";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { getSubcategoriesByCategoryId, getAllCategories } from "./Api";
import replaceImage from "../images/replace.png";

function NewCourse() {
  const user = GetUser();
  var username, c_user;
  if (user.data) {
    username = user.data[0].username;
    c_user = { id: user.data[0].id, username };
  }
  const [Error, setError] = useState(false);
  const [subjectError, setSubjectError] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subjects, setSubjects] = useState([]);
  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategory, setShowSubcategory] = useState(false);
  const [files, setFile] = useState("");
  const [filename, setFilename] = useState("");

  const uploadFile = async (event) => {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      setFilename(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        console.log(e.target.result)
        const formData = { file: e.target.result };
        const response = await axios.post(
          `http://localhost:8000/api/v1/upload/image`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(response);
      };
    } else {
      setFile("");
      setFilename("");
    }
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const fetchSubcategories = async (event) => {
    const categoryId = event.target.value;
    if (categoryId > 0) {
      const subcategories = await getSubcategoriesByCategoryId(categoryId);
      setSubcategories(subcategories.data);
      setShowSubcategory(true);
    } else {
      setShowSubcategory([]);
      setShowSubcategory(false);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getAllCategories();
      setCategories(categories.data);
    }
    fetchCategories();
    return () => {
      setCategories([]);
    };
  }, []);

  const addSubjects = (string) => {
    var subject;
    if (typeof string === "string") {
      subject = string.replace(/\s+/g, " ").trim();
    } else {
      const str = document.getElementById("subjects").value;
      subject = str.replace(/\s+/g, " ").trim();
    }
    var bool = false;
    subjects.map((data) => {
      if (data.toLowerCase() === subject.toLowerCase()) {
        bool = true;
      }
      return bool;
    });
    if (subject.trim().length > 0 && !bool) {
      setSubjectSuggestions([]);
      document.getElementById("subjects").value = "";
      return setSubjects((oldArray) => [...oldArray, subject]);
    } else if (bool) {
      return setSubjectError("this subject is already in the list");
    }
  };
  const removeSubject = (data) => {
    setSubjects(subjects.filter((item) => item !== data));
  };
  const handleChange = async (event) => {
    const input = event.target.value;
    setSubjectError("");
    if (input.trim() === "") {
      setSubjectSuggestions([]);
    } else {
      const response = await suggestSubject(input);
      const suggestion = response.data;
      if (suggestion.length === 1 && suggestion[0].name === input) {
        setSubjectSuggestions(suggestion);
      } else {
        setSubjectSuggestions([{ name: input }, ...suggestion]);
      }
    }
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.charCode === 13) {
      return addSubjects();
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
        subtitle: document.getElementById("subtitle").value,
        description: stateToHTML(editorState.getCurrentContent()),
        ownerId: document.querySelector('input[name="owner"]:checked').value,
        language: document.getElementById("selectLang").value,
        category: document.getElementById("category").value,
        subcategory: document.getElementById("subCategory").value,
        subjects: subjects,
        privacy: document.querySelector('input[name="privacy"]:checked').value,
      };
      const result = await axios.post(
        "http://localhost:8000/api/v1/course/",
        request,
        { withCredentials: true }
      );
      const { message, err } = result.data;
      if (err) setError(err);
      if (message) {
        if (message === "success") {
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
      <form
        className="create-school-form"
        autoComplete="off"
        method="post"
        encType="multipart/form-data"
      >
        <div className="row">
          <span>
            <label htmlFor="owner">
              Owner <span className="req">*</span>
            </label>
            {c_user ? (
              <SummaryBox
                text={username}
                menuDirection={"left"}
                listArray={[c_user]}
                name="owner"
                current_item={username}
                style={{
                  marginTop: "7px",
                  height: "40px",
                  paddingTop: "8px",
                  borderColor: "#ccd0d5",
                }}
              />
            ) : (
              ""
            )}
          </span>
          <span className="of">{">"}</span>
          <span style={{ width: "100%" }}>
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
        <label htmlFor="subtitle">Course Subtitle</label>
        <input
          type="text"
          className={`subtitle light-blue`}
          id="subtitle"
          name="subtitle"
        />
        <label>Course Description</label>
        <Editor
          editorState={editorState}
          toolbarClassName="learnsten-toolbar"
          wrapperClassName="learnsten-wrapper"
          editorClassName="learnsten-editor"
          placeholder="Insert your course description"
          toolbar={{
            options: ["inline", "list"],
            inline: {
              className: "inline-elements",
              options: ["bold", "italic"],
            },
            list: {
              className: "list-elements",
              options: ["unordered", "ordered"],
            },
          }}
          onEditorStateChange={onEditorStateChange}
        />
        <label htmlFor="basic-info">Basic Info</label>
        <div className="basic-selector">
          <select name="language" id="selectLang" defaultValue="en">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
          <select
            title="Category"
            id="category"
            name="category"
            onChange={fetchSubcategories}
            className="form-control"
            defaultValue="-1"
          >
            <option value="-1">-- Select Category --</option>
            {categories.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            })}
          </select>
          <select
            hidden={showSubcategory ? "" : "hidden"}
            id="subCategory"
            name="sub-category"
            defaultValue="-1"
          >
            <option value="-1">-- Select Subcategory --</option>
            {subcategories.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            })}
          </select>
        </div>
        <label htmlFor="subjects">
          What is primarily taught in this course?
        </label>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              className={`subjects light-blue`}
              id="subjects"
              name="subjects"
              onChange={handleChange}
              onKeyPress={handleKeypress}
              placeholder="e.g. python"
              style={{
                border: "none",
                margin: "0",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
              }}
            />
            <ul className="subject-suggestions">
              {subjectSuggestions.map((data, i) => (
                <li
                  key={i}
                  className="data-row-item"
                  onClick={() => addSubjects(data.name)}
                >
                  <div className="suggested-text">{data.name}</div>
                  <button type="button" className="select">
                    Select
                  </button>
                </li>
              ))}
            </ul>
          </div>
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
        )}{" "}
        <div className="privacy" style={{ marginTop: "20px" }}>
          <div className="flex">
            <input
              type="radio"
              value="0"
              id="public"
              name="privacy"
              defaultChecked
            />
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
                Anyone on the learnsten can see this course.
              </div>
            </div>
          </div>
          <div className="flex">
            <input type="radio" value="1" id="private" name="privacy" />
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
                You choose who can view and join your course.
              </div>
            </div>
          </div>
        </div>
        <div className="replace-image">
          <img
            className="image-upload"
            src={replaceImage}
            alt="course-preview"
          />
          <div>
            Upload your course image here. It must meet our course image quality
            standards to be accepted. Important guidelines: 750x422 pixels;
            .jpg, .jpeg,. gif, or .png.
            <label htmlFor="replace-image" className="replace-label">
              <input
                type="text"
                readOnly
                placeholder={filename ? filename : "No file selected"}
              />
              <span>
                <span
                  className="upload-btn"
                  onClick={
                    filename
                      ? () => {
                          setFile("");
                          setFilename("");
                        }
                      : () => {}
                  }
                >
                  {filename ? "Change" : "Upload file"}
                </span>
              </span>
            </label>
            <input
              accept=".gif,.jpg,.jpeg,.png"
              type="file"
              className="file-uploader"
              id="replace-image"
              onChange={uploadFile}
            />
          </div>
        </div>
        <input
          type="button"
          onClick={createNewCourse}
          name={`Register`}
          value={Loader ? `Creating New Course...` : `Create New Course`}
          className={`register ${Loader ? `loadingBtn` : ``}`}
        />
      </form>
    </div>
  );
}

export default NewCourse;
