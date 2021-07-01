import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import LanguageIcon from "@material-ui/icons/Language";
import ReplyIcon from "@material-ui/icons/Reply";
import InfoIcon from "@material-ui/icons/Info";
import StarRatings from "react-star-ratings";
import Cookies from "js-cookie";
import replaceImage from "../images/replace.png";

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
  const iconStyle = { fontSize: "16px", marginRight: "10px", color: "#586069" };

  const { username } = owner;
  const { name, last_updated, ownerId, subtitle, language } = course;
  return (
    <div className="profile-all no-sidebar">
      {name ? (
        <div className="content course-view">
          <div
            className="space news"
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
                  <img src={replaceImage} alt="course-preview" />
                  <div className="side-course">
                    <button className="course-btn full-theme">
                      Join this course
                    </button>
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
                <div className="left-container as">
                  <h1 className="top-heading">Course content</h1>
                  <div className="no-lecture">
                    <h1>
                      {parseInt(c_id) === ownerId
                        ? "You don't"
                        : `${username} doesn't`}{" "}
                      have any lectures
                    </h1>
                  </div>
                </div>
                <div
                  className="right-container as"
                  style={{ width: "30%", padding: "0" }}
                ></div>
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
