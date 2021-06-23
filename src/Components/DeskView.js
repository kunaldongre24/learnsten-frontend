import React from "react";
import Bullet from "./Bullet";
import { timeSince } from "./Utils";
import Loader from "./Loader";
import { Link } from "react-router-dom";

function DeskView(props) {
  const { loader, schools, userId } = props;

  return (
    <div className="desk-body">
      {loader ? (
        <div className="school-info">
          <Loader style={{ margin: "auto" }} />
        </div>
      ) : (
        schools.map((school) => (
          <div className="school-info" key={school.id}>
            <div className="schoolProfile">
              <div className="profileReplace">
                <div className="letter">{school.name.charAt(0)}</div>
                <div className="shine"></div>
              </div>
            </div>
            <div className="school-left">
              <h1>
                <Link to={`/school/${school.id}`}>{school.name}</Link>
              </h1>
              <div className="school-desc">{school.description}</div>
              <div className="last-row">
                <span className="courseCount">
                  <Bullet color="#4ba55d" />
                  {school.courseCount}
                  <span className="alt-text">
                    {school.courseCount === 1 ? "Course" : "Courses"}
                  </span>
                  <Bullet color="#747F8D" />0
                  <span className="alt-text"> Members </span>
                </span>
              </div>
              <span className="last-update">
                Updated {timeSince(new Date(school.last_updated))}
              </span>
            </div>
            <div className="school-right">
              {school.ownerId === userId ? (
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
