import React from "react";
import { timeSince } from "./Utils";
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
        courses.slice(0, 6).map((course) => (
          <div className="school-info" key={course.id}>
            <div className="schoolProfile">
              <div className="profileReplace">
                <div className="letter">{course.name.charAt(0)}</div>
                <div className="shine"></div>
              </div>
            </div>
            <div className="school-left">
              <h1>
                <Link to={`/course/${course.id}`}>{course.name}</Link>
              </h1>
              {course.subtitle ? (
                <div className="school-desc">course.subtitle</div>
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
            <div className="school-right">
              {course.ownerId === userId ? (
                ""
              ) : (
                <button className="join-school">Join</button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DeskView;
