import React, { useEffect, useState } from "react";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";
import Loader from "./Loader";
import { getCoursesBySchoolId } from "./Api";

function CoursesList(props) {
  const { c_id, isMySchool, schoolId } = props;
  const [courses, setCourses] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const getSchoolData = async () => {
      setLoader(true);
      const courses = await getCoursesBySchoolId(schoolId);
      setCourses(courses.data);
      setLoader(false);
    };
    getSchoolData();
  }, [schoolId]);

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
        {isMySchool ? (
          <Link className="new-school" to={`/school/${schoolId}/courses/new`}>
            <SchoolOutlinedIcon />
            New
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="school-body">
        {loader ? (
          <div className="school-info">
            <Loader style={{ margin: "auto" }} />
          </div>
        ) : (
          courses.map((course) =>
            course.ownerId === c_id || !course.privacy ? (
              <div className="school-info" key={course.id}>
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
                  <div className="school-desc">{course.description}</div>
                  <div className="last-row">
                    <span></span>
                    <span className="last-update">
                      Updated {timeSince(new Date(course.last_updated))}
                    </span>
                  </div>
                </div>
                <div className="school-right"></div>
              </div>
            ) : (
              ""
            )
          )
        )}
      </div>
    </div>
  );
}

export default CoursesList;
