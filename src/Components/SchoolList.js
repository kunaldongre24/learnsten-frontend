import React, { useEffect, useState } from "react";
import { getSchoolByUserId } from "./Api";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";
import Loader from "./Loader";

function SchoolList(props) {
  const { isMyProfile, username, userId } = props;
  const [schools, setSchools] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(async () => {
    setLoader(true);
    const schools = await getSchoolByUserId(userId);
    setSchools(schools.data);
    setLoader(false);
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
          <Link className="new-school" to={`/${username}/school/new`}>
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
          ))
        )}
      </div>
    </div>
  );
}

export default SchoolList;
