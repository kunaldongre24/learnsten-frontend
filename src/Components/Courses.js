import React, { useEffect, useState } from "react";
import SummaryBox from "./SummaryBox";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import Loader from "./Loader";
import { getCoursesByUserId } from "./Api";

function CoursesList(props) {
  const { userId, isMyProfile } = props;
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getSchoolData = async () => {
      setLoader(true);
      const courses = await getCoursesByUserId(userId);
      setCourses(courses.data);
      setLoader(false);
      return () => setCourses([]);
    };
    getSchoolData();
  }, [userId]);
  return (
    <div>
      <div className="school-header">
        <input
          type="text"
          className="find-school"
          placeholder="Find a school..."
        />
        <SummaryBox
          text="Type"
          style={{ border: "1px solid #dbdbdb" }}
          modalHeader="something"
        />
        <SummaryBox
          text="Subject"
          style={{ border: "1px solid #dbdbdb" }}
          modalHeader="something"
        />
        <SummaryBox
          text="Sort"
          style={{ border: "1px solid #dbdbdb" }}
          modalHeader="something"
        />
        {isMyProfile ? (
          <Link className="new-school" to={`/new`}>
            <VideoLibraryOutlinedIcon />
            New
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="course-body">
        {loader ? (
          <div className="school-info">
            <Loader style={{ margin: "auto" }} />
          </div>
        ) : courses.length ? (
          courses.map((course) =>
            course.ownerId === userId || !course.privacy ? (
              <div className="school-info detailed" key={course.id}>
                <div className="school-left">
                  <h1>
                    <Link to={`/course/${course.id}`}>{course.name}</Link>
                    {course.privacy ? (
                      <span className="privacy-info">
                        {course.privacy ? "Private" : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                  {course.subtitle ? (
                    <div className="school-desc">{course.subtitle}</div>
                  ) : (
                    ""
                  )}
                  <div className="last-row">
                    <div className="box">
                      <span className="followers">
                        {course.lectureCount}{" "}
                        <span className="text">
                          {course.lectureCount === 1 ? "course" : "courses"}
                        </span>
                      </span>
                      {" · "}
                      <span className="following">
                        0 <span className="text"> members </span>
                      </span>
                    </div>
                  </div>
                  <span className="last-update">
                    Updated {timeSince(new Date(course.last_updated))}
                  </span>
                </div>
                <div className="school-right"></div>
              </div>
            ) : (
              ""
            )
          )
        ) : (
          <div className="no-courses">
            <div className="no-course-logo no-logo"></div>
            <h2>This school don't have any course yet.</h2>
            <div className="newBtn">
              {isMyProfile ? (
                <Link className="new-school" to={`/new`}>
                  <VideoLibraryOutlinedIcon />
                  New Course
                </Link>
              ) : (
                ""
              )}
              <a href="/learn-more">Learn more</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursesList;
