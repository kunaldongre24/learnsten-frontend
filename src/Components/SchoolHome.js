import React, { useState, useEffect } from "react";
import Bullet from "./Bullet";
import { timeSince } from "./Utils";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { getCoursesBySchoolId } from "./Api";

function SchoolHome(props) {
  const { schoolId } = props;
  const [loader, setLoader] = useState(false);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    setLoader(true);
    const getCourses = async () => {
      const courses = await getCoursesBySchoolId(schoolId);
      setCourses(courses.data);
    };
    getCourses();
    setLoader(false);
    return () => {
      setCourses([]);
    };
  }, [schoolId]);
  return (
    <div className="desk-body">
      {loader ? (
        <div className="school-info">
          <Loader style={{ margin: "auto" }} />
        </div>
      ) : (
        courses.map((course) => (
          <div className="school-info" key={course.id}>
            <div className="school-left">
              <h1>
                <Link to={`/course/${course.id}`}>{course.name}</Link>
              </h1>
              <div className="school-desc">{course.description}</div>
              <div className="last-row">
                <span className="courseCount">
                  <Bullet color="#4ba55d" />0
                  <span className="alt-text">Lectures</span>
                </span>
              </div>
              <span className="last-update">
                Updated {timeSince(new Date(course.last_updated))}
              </span>
            </div>
            <div className="school-right"></div>
          </div>
        ))
      )}
    </div>
  );
}

export default SchoolHome;
