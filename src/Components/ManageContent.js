import React, { useState, useEffect } from "react";
import "../style/ManageContent.css";
import {
  getCourseById,
  getLecturesBySectionId,
  getSectionsByCourseId,
  deleteLecture,
} from "./Api";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";

function ManageContent(props) {
  const { courseId } = props;
  const [course, setCourse] = useState([]);
  const [notification, setNotification] = useState(true);
  const [editSectionId, setEditSectionId] = useState();
  const [editLectureId, setEditLectureId] = useState();
  const [newView, setNewView] = useState(false);
  const [contentView, setContentView] = useState({});
  const [sections, setSections] = useState([
    { id: 1, name: "Introduction", section_index: 1 },
  ]);
  const [lectures, setLectures] = useState([
    { id: 1, name: "Introduction", lecture_index: 1 },
  ]);
  useEffect(() => {
    const getCourse = async () => {
      const course = await getCourseById(courseId);
      setCourse(course.data[0]);
    };
    getCourse();
  }, [courseId]);
  const getSections = async () => {
    const sections = await getSectionsByCourseId(courseId);
    if (sections.data.length) {
      setSections(sections.data);
    }
  };
  const getLectures = async () => {
    for (var i = 0; i < sections.length; i++) {
      const lectures = await getLecturesBySectionId(sections[i].id);
      if (lectures.data.length) {
        setLectures(lectures.data);
      } else {
        setLectures([]);
      }
    }
  };
  const deleteLectureFromId = async (lectureId) => {
    await deleteLecture(lectureId);
    getLectures();
  };
  useEffect(() => {
    const getLectures = async () => {
      for (var i = 0; i < sections.length; i++) {
        const lectures = await getLecturesBySectionId(sections[i].id);
        if (lectures.data.length) {
          setLectures(lectures.data);
        } else {
          setLectures([]);
        }
      }
    };
    getLectures();
  }, [sections]);
  useEffect(() => {
    const getSections = async () => {
      const sections = await getSectionsByCourseId(courseId);
      if (sections.data.length) {
        setSections(sections.data);
      }
    };
    getSections();
  }, [courseId]);
  const newLecture = (position) => {
    setContentView({ p: position, bool: true });
  };

  const saveSection = async (sectionId) => {
    const inputTitle = document.getElementById(`section_title` + sectionId);
    if (inputTitle) {
      const name = document.getElementById(`section_title` + sectionId).value;
      if (!name || name.trim() === "") {
        return (document.getElementById(
          "section_title" + sectionId
        ).style.backgroundColor = "#FCE3E6");
      }
      const objective = document.getElementById("objective" + sectionId).value;
      const request = {
        objective,
        name,
        section_index: 1,
        course_id: courseId,
      };
      await axios.post("http://localhost:8000/api/v1/section/", request, {
        withCredentials: true,
      });
    }
    getSections();
    setEditSectionId(0);
  };
  const updateSection = async (sectionId) => {
    const inputTitle = document.getElementById(`section_title` + sectionId);
    if (inputTitle) {
      const name = document.getElementById(`section_title` + sectionId).value;
      if (!name || name.trim() === "") {
        return (document.getElementById(
          "section_title" + sectionId
        ).style.backgroundColor = "#FCE3E6");
      }
      const objective = document.getElementById("objective" + sectionId).value;

      const request = {
        objective,
        name,
        section_index: 1,
        course_id: courseId,
      };
      await axios.put(
        `http://localhost:8000/api/v1/section/${sectionId}`,
        request,
        {
          withCredentials: true,
        }
      );
    }

    getSections();
    setEditSectionId(0);
  };
  const saveLecture = async (lectureId, sectionId, position) => {
    const inputTitle = document.getElementById(`lecture_title` + lectureId);
    if (inputTitle) {
      const name = document.getElementById(`lecture_title` + lectureId).value;
      if (!name || name.trim() === "") {
        return (document.getElementById(
          "lecture_title" + lectureId
        ).style.backgroundColor = "#FCE3E6");
      }
      const lecture_index =
        position === "last"
          ? lectures.filter((lecture) => lecture.section_id === sectionId)
              .length + 1
          : 1;
      const request = { name, lecture_index, section_id: sectionId };
      await axios.post("http://localhost:8000/api/v1/lecture/", request, {
        withCredentials: true,
      });
    }
    getLectures();
    setContentView({ bool: false });
    setEditLectureId(0);
  };
  const updateLecture = async (lectureId, sectionId) => {
    const inputTitle = document.getElementById(`lecture_title` + lectureId);
    if (inputTitle) {
      const name = document.getElementById(`lecture_title` + lectureId).value;
      if (!name || name.trim() === "") {
        return (document.getElementById(
          "lecture_title" + lectureId
        ).style.backgroundColor = "#FCE3E6");
      }
      const request = { name, section_id: sectionId };
      await axios.put(
        `http://localhost:8000/api/v1/lecture/${lectureId}`,
        request,
        { withCredentials: true }
      );
    }
    getLectures();
    setContentView({ bool: false });
    setEditLectureId(0);
  };
  return (
    <div className="mc-container">
      <div className="setting-heading">
        <h2>Manage content</h2>
      </div>
      {notification ? (
        <div className="setting-info">
          <div>
            Here's where you add and manage course content like lectures, course
            sections, notes and more. Click + icon to get started
          </div>
          <span
            className="remove-notification"
            onClick={() => setNotification(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#aaa"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </span>
        </div>
      ) : (
        ""
      )}
      <span className="text-info">
        Start putting together your course by creation sections, lectures and
        notes below.
      </span>
      <div className="new-course-btn" style={{ marginTop: "30px" }}>
        <button className="theme-font dashed">
          <div className="btn-text">+New Section</div>
        </button>
      </div>
      <div className="new-content">
        {sections.map((section) => {
          const editView = course.section_count
            ? editSectionId === section.id
            : editSectionId === 1;
          return (
            <div className="lst-section" key={section.id}>
              <div className={`flex-head ${editView ? `hidden` : ``}`}>
                <span className="section-heading">
                  Section {section.section_index}:
                </span>
                <span className="section-title">
                  <DescriptionOutlinedIcon
                    style={{
                      color: "#555",
                      fontSize: "16px",
                    }}
                  />
                  {section.name}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditSectionId(section.id);
                    setEditLectureId(0);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    fill="#555"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />{" "}
                  </svg>
                </button>
                <button className="delete-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="18px"
                    viewBox="0 0 24 24"
                    width="18px"
                    fill="#555"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                  </svg>
                </button>
              </div>
              <div className="new-course-btn">
                {contentView.bool && contentView.p === "first" ? (
                  <div className="lst-flex" style={{ flexWrap: "wrap" }}>
                    <button
                      className="theme-font visible dashed"
                      onClick={() => {
                        newLecture();
                        setNewView(false);
                      }}
                    >
                      <div className="btn-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          fill="#aaa"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none"></path>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                        </svg>
                        Cancel
                      </div>
                    </button>
                    <div
                      className={`content-type lst-flex ${
                        newView ? `hidden` : ``
                      }`}
                    >
                      <button
                        onClick={() => {
                          setNewView(true);
                        }}
                      >
                        <AddBoxIcon />
                        Lecture
                      </button>
                      <button>
                        <AddBoxIcon />
                        Quiz
                      </button>
                      <button>
                        <AddBoxIcon />
                        Coding Exercise
                      </button>
                      <button>
                        <AddBoxIcon />
                        Practice Test
                      </button>
                      <button>
                        <AddBoxIcon />
                        Assignment
                      </button>
                    </div>

                    <div
                      className={`edit-section lst-flex ${
                        newView ? `` : "hidden"
                      }`}
                      style={{ marginTop: "5px" }}
                    >
                      <div className="section-heading">New Lecture:</div>
                      <div className="course-input">
                        <input
                          type="text"
                          id="lecture_title_new"
                          placeholder="Enter a Title"
                        />

                        <div className="course-buttons lst-flex">
                          <button
                            className="cancelBtn btn theme-font"
                            onClick={() => {
                              setEditLectureId(0);
                              newLecture();
                              setNewView(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="saveBtn btn theme-font"
                            onClick={() => {
                              saveLecture("_new", section.id, "first");
                            }}
                          >
                            Save Lecture
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="theme-font dashed"
                    onClick={() => {
                      newLecture("first");
                      setNewView(false);
                    }}
                  >
                    <div className="btn-text">+New</div>
                  </button>
                )}
              </div>
              <div
                className={`edit-section lst-flex ${editView ? `` : `hidden`}`}
              >
                <div className="section-heading">
                  Section {section.section_index}:
                </div>
                <div className="course-input">
                  <input
                    type="text"
                    id={`section_title${section.id}`}
                    placeholder="Enter a Title"
                    defaultValue={section.name}
                  />
                  <label htmlFor="objective">
                    What will students be able to do at the end of this section?
                  </label>
                  <input
                    type="text"
                    id={`objective${section.id}`}
                    defaultValue={section.objective}
                    placeholder="Enter a Learning Objective"
                  />
                  <div className="course-buttons lst-flex">
                    <button
                      className="cancelBtn btn theme-font"
                      onClick={() => {
                        setEditSectionId(0);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        course.section_count
                          ? updateSection(section.id)
                          : saveSection(section.id)
                      }
                      className="saveBtn btn theme-font"
                    >
                      Save Section
                    </button>
                  </div>
                </div>
              </div>
              {lectures
                .filter((lecture) => lecture.section_id === section.id)
                .map((lecture) => {
                  const editView = section.lecture_count
                    ? lecture.id === editLectureId
                    : editLectureId === 1;
                  return (
                    <div className="lecture-content" key={lecture.id}>
                      <div
                        className={`lst-lecture ${editView ? `hidden` : ``}`}
                      >
                        <div className="lst-lecture-left">
                          <span className="lecture-heading">
                            <CheckCircleIcon
                              style={{
                                color: "#278799",
                                fontSize: "16px",
                              }}
                            />
                            Lecture {lecture.lecture_index}:
                          </span>
                          <span className="lecture-title">
                            &nbsp;&nbsp;{lecture.name}
                          </span>
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditLectureId(lecture.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18px"
                              viewBox="0 0 24 24"
                              width="18px"
                              fill="#555"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />{" "}
                            </svg>
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => deleteLectureFromId(lecture.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="18px"
                              viewBox="0 0 24 24"
                              width="18px"
                              fill="#555"
                            >
                              <path d="M0 0h24v24H0V0z" fill="none" />
                              <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
                            </svg>
                          </button>
                        </div>
                        <div className="lst-lecture-right">
                          <button>+ Content</button>
                        </div>
                      </div>
                      <div
                        className={`edit-section lst-flex ${
                          editView ? `` : `hidden`
                        }`}
                      >
                        <div className="section-heading">
                          Lecture {lecture.lecture_index}:
                        </div>
                        <div className="course-input">
                          <input
                            type="text"
                            id={`lecture_title${lecture.id}`}
                            placeholder="Enter a Title"
                            defaultValue={lecture.name}
                          />

                          <div className="course-buttons lst-flex">
                            <button
                              className="cancelBtn btn theme-font"
                              onClick={() => {
                                setEditLectureId(0);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="saveBtn btn theme-font"
                              onClick={() =>
                                section.lecture_count
                                  ? updateLecture(lecture.id, section.id)
                                  : saveLecture(lecture.id, section.id)
                              }
                            >
                              Save Lecture
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              <div className="new-course-btn " style={{ marginBottom: "-8px" }}>
                {contentView.bool && contentView.p === "last" ? (
                  <div className="lst-flex" style={{ flexWrap: "wrap" }}>
                    <button
                      className="theme-font visible dashed"
                      onClick={() => {
                        newLecture();
                      }}
                    >
                      <div className="btn-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          fill="#aaa"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none"></path>
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
                        </svg>
                        Cancel
                      </div>
                    </button>
                    <div
                      className={`content-type lst-flex ${
                        newView ? `hidden` : ""
                      }`}
                    >
                      <button
                        onClick={() => {
                          setNewView(true);
                        }}
                      >
                        <AddBoxIcon />
                        Lecture
                      </button>
                      <button>
                        <AddBoxIcon />
                        Quiz
                      </button>
                      <button>
                        <AddBoxIcon />
                        Coding Exercise
                      </button>
                      <button>
                        <AddBoxIcon />
                        Practice Test
                      </button>
                      <button>
                        <AddBoxIcon />
                        Assignment
                      </button>
                    </div>
                    <div
                      className={`edit-section lst-flex ${
                        newView ? `` : "hidden"
                      }`}
                      style={{ marginTop: "5px" }}
                    >
                      <div className="section-heading">New Lecture:</div>
                      <div className="course-input">
                        <input
                          type="text"
                          id="lecture_title_new"
                          placeholder="Enter a Title"
                        />

                        <div className="course-buttons lst-flex">
                          <button
                            className="cancelBtn btn theme-font"
                            onClick={() => {
                              setEditLectureId(0);
                              newLecture();
                              setNewView(false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="saveBtn btn theme-font"
                            onClick={() => {
                              saveLecture("_new", section.id, "last");
                            }}
                          >
                            Save Lecture
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : lectures.filter(
                    (lecture) => lecture.section_id === section.id
                  ).length ? (
                  <button
                    className="theme-font dashed"
                    onClick={() => {
                      newLecture("last");
                      setNewView(false);
                    }}
                  >
                    <div className="btn-text">+New</div>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="new-course-btn" style={{ marginBottom: "-8px" }}>
        <button className="theme-font dashed">
          <div className="btn-text">+New Section</div>
        </button>
      </div>
    </div>
  );
}

export default ManageContent;
