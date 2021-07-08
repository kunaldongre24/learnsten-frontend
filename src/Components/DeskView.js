import React from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function DeskView(props) {
  const { loader, courses, userId } = props;
  return (
    <div className="desk-body">
      {loader ? (
        <div className="school-info">
          <Loader style={{ margin: "auto" }} />
        </div>
      ) : (
        <div className="no-space">
          {courses.slice(0, 6).map((course) => (
            <div className="school-info column" key={course.id}>
              <img
                className="course-image"
                alt="course"
                src={`http://localhost:8000/${course.course_image_url}`}
              />
              <div className="school-left pd-10">
                <h1>
                  <Link to={`/course/${course.id}`}>{course.name}</Link>
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
              </div>
              <div className="school-right">
                {course.ownerId === userId ? (
                  ""
                ) : (
                  <button className="join-school">Join</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeskView;
