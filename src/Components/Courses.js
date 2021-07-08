import React, { useEffect, useState } from "react";
import SummaryBox from "./SummaryBox";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import Loader from "./Loader";
import { getCoursesByUserId } from "./Api";
import NoContent from "./NoContent";

function CoursesList(props) {
  const { userId, isMyProfile, username } = props;
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
                <img
                  className="course-image"
                  alt="course"
                  src={`http://localhost:8000/${course.course_image_url}`}
                />

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
                        {course.lecture_count}{" "}
                        <span className="text">
                          {course.lecture_count === 1 ? "course" : "courses"}
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
          <NoContent
            msg={
              isMyProfile
                ? "You don't have any course yet."
                : `${username} doesn't have any course yet.`
            }
            myProfile={isMyProfile}
            buttonText="New Course"
            btnLink="/new"
            logoClass="no-course-logo"
            Icon={VideoLibraryOutlinedIcon}
          />
        )}
      </div>
    </div>
  );
}

export default CoursesList;
