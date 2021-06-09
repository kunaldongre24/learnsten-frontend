import React, { useState } from "react";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";
import Loader from "./Loader";

function CoursesList(props) {
  const { c_id, isMySchool, schoolId } = props;
  const [schools, setSchools] = useState([]);
  const [loader, setLoader] = useState(false);
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
          schools.map((school) =>
            school.ownerId === c_id || !school.privacy ? (
              <div className="school-info" key={school.id}>
                <div className="school-left">
                  <h1>
                    <Link to={`/school/${school.id}`}>{school.name}</Link>
                    {school.privacy ? (
                      <span className="privacy-info">
                        {school.privacy ? "Private" : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </h1>
                  <div className="school-desc">{school.description}</div>
                  <div className="last-row">
                    <span className="last-update">
                      Updated {timeSince(new Date(school.last_updated))}
                    </span>
                  </div>
                </div>
                <div className="school-right">
                  <button className="join-school">Join</button>
                </div>
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
