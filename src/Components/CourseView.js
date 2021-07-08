import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LanguageIcon from "@material-ui/icons/Language";
import ReplyIcon from "@material-ui/icons/Reply";
import InfoIcon from "@material-ui/icons/Info";
import StarRatings from "react-star-ratings";
import Cookies from "js-cookie";
import NoContent from "./NoContent";

import {
  getCourseById,
  getSubjectById,
  getSubjectsByCourseId,
  getUserById,
} from "./Api";
import Loader from "./Loader";
import "../style/course.css";
import { timeSince } from "./Utils";

export default function CourseView(props) {
  const courseId = props.match.params.courseId;
  const c_id = Cookies.get("c_id");
  const [course, setCourse] = useState({});
  const [owner, setOwner] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ bool: false, msg: "" });
  useEffect(() => {
    setLoading(true);
    const fetchCourseData = async () => {
      const response = await getCourseById(courseId);
      setCourse(response.data[0]);
      fetchOwnerData(response.data[0].ownerId);
      fetchCourseSubjects(response.data[0].id);
    };
    fetchCourseData();
    setLoading(false);
    return () => {
      setCourse({});
    };
  }, [courseId]);
  useEffect(() => {
    if (course.lecture_count) {
      setNotification({ bool: false, msg: "" });
    } else {
      setNotification({
        bool: true,
        msg: "This course will be visible on learnsten after you put some content in it.",
      });
    }
  }, [course]);
  const fetchOwnerData = async (userId) => {
    const response = await getUserById(userId);
    setOwner(response.data[0]);
  };
  const fetchCourseSubjects = async (courseId) => {
    const response = await getSubjectsByCourseId(courseId);
    response.data.map(async (data) => {
      const subjects = await getSubjectById(data.subjectId);
      setSubjects((prev) => [...prev, subjects.data[0]]);
    });
  };
  const iconStyle = { fontSize: "16px", marginRight: "10px", color: "#64DE98" };

  const { username } = owner;
  const {
    name,
    last_updated,
    ownerId,
    subtitle,
    language,
    course_image_url,
    description,
  } = course;
  return (
    <div className="profile-all no-sidebar">
      <div className="course-header">
        <div className="name-header">{name}</div>
        <div className="info-header">
          <svg
            viewBox="0 0 51 48"
            className="widget-svg"
            style={{
              width: "18px",
              height: "18px",
              transition: " transform 0.2s ease-in-out 0s",
            }}
          >
            <path
              className="star"
              d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
              style={{
                fill: "rgb(255, 174, 0)",
                transition: "fill 0.2s ease-in-out 0s",
              }}
            ></path>
          </svg>
          <span className="rating-num">4.5</span>
          <span className="other">(1,342) &nbsp;12,232 students</span>
        </div>
      </div>
      {notification.bool ? (
        <div className="notify-header">
          <div className="notify-content">{notification.msg}</div>
          <span
            className="remove-notification"
            onClick={() => setNotification({ bool: false, msg: "" })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
            </svg>
          </span>
        </div>
      ) : (
        ""
      )}
      {course ? (
        <div className="content course-view">
          <div
            className="space news dark"
            style={{
              height: "auto",
              padding: "10px",
            }}
          >
            <div
              style={{
                maxWidth: "1100px",
                margin: "auto",
                padding: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="school-left">
                  <h1
                    className="school-name"
                    style={{
                      marginBottom: "8px",
                      fontSize: "24px",
                      lineHeight: "1.2",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    {name}
                  </h1>
                  <div className="school-desc">{subtitle}</div>
                  <div className="rating">
                    <StarRatings
                      starDimension="18px"
                      starSpacing="1px"
                      rating={4.3}
                      starRatedColor="#ffae00"
                      numberOfStars={5}
                      name="rating"
                      style={{ border: "1px solid #fff" }}
                    />
                  </div>
                  <div className="dim-text">
                    Created by{" "}
                    <Link to={`/${username}`}>
                      {owner.name ? owner.name : username}
                    </Link>
                  </div>
                  <div className="dim-text course-flex lm">
                    <LanguageIcon style={iconStyle} />
                    {language === "en" ? "English" : "Hindi"}
                  </div>
                  <div className="dim-text course-flex lm">
                    <InfoIcon style={iconStyle} /> Subjects:{" "}
                    {subjects.length ? subjects[0].name : ""}
                    {subjects.length > 1 ? `, ${subjects[1].name}` : ""}
                  </div>
                  <div className="dim-text course-flex lm">
                    <AccessTimeIcon style={iconStyle} /> Last Updated{" "}
                    {timeSince(new Date(last_updated))}
                  </div>
                  <div style={{ display: "flex" }}>
                    <button
                      className="course-flex course-btn"
                      style={{ boxShadow: "none", marginRight: "6px" }}
                    >
                      Share{" "}
                      <ReplyIcon
                        style={{
                          fontSize: "16px",
                          marginLeft: "4px",
                        }}
                      />
                    </button>
                    <button className="course-btn course-flex">
                      Bookmark
                      <BookmarkBorderIcon
                        style={{
                          fontSize: "16px",
                          marginLeft: "4px",
                        }}
                      />
                    </button>
                  </div>
                </div>
                <div className="right-box">
                  <img
                    src={`http://localhost:8000/${course_image_url}`}
                    alt="course-preview"
                  />
                  <div className="side-course">
                    {ownerId === parseInt(c_id) ? (
                      <Link to={`/course/${courseId}/manage`}>
                        <button className="course-btn full-theme">
                          Manage Course
                        </button>
                      </Link>
                    ) : (
                      <button className="course-btn full-theme">
                        Join this course
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="profile-body cn"
            style={{ maxWidth: "1100px", padding: "0 16px" }}
          >
            {loading ? (
              <Loader />
            ) : (
              <div className="expand">
                <div className="left-container as" style={{ width: "66.66%" }}>
                  <div className="course-desc">
                    <h1>Description</h1>
                    <div
                      className="desc-content"
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    ></div>
                  </div>
                  <h1 className="top-heading">Course content</h1>
                  <div className="outline">
                    <NoContent
                      msg="This course don't have any content yet."
                      myProfile={ownerId === parseInt(c_id)}
                      buttonText="Add Content"
                      btnLink={`/course/${courseId}/manage`}
                    />
                  </div>
                </div>
                <div
                  className="right-container as"
                  style={{
                    width: "33%",
                    padding: "16px",
                    margin: "16px 0",
                    border: "1px solid #e1e3e8",
                  }}
                >
                  <h1>This course includes</h1>
                  <ul>
                    <li>6 hours on-demand video</li>
                    <li>10 articles</li>
                    <li>4 downloadable resources</li>
                    <li>Full lifetime access</li>
                    <li>Access on mobile and TV</li>
                    <li>Assignments</li>
                    <li>Certificate of completion</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
