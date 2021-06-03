import React, { useEffect, useState } from "react";
import { getSchoolByUserId } from "./Api";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";
import { timeSince } from "./Utils";

function SchoolList(props) {
  const { isMyProfile, username, userId } = props;
  const [schools, setSchools] = useState([]);
  const date = new Date("2021-05-31 23:13:14");
  useEffect(async () => {
    const schools = await getSchoolByUserId(userId);
    console.log(schools);
    setSchools(schools.data);
  }, []);

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
        <div className="school-info">
          <h1>
            <Link to={`/${username}`}>Kunal Dongre School</Link>
            <span className="privacy-info">Private</span>
          </h1>
          <div className="school-desc">
            Hi this is the school this is a test thank you
          </div>
          <div className="last-row">
            <span className="last-update">Updated {timeSince(date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolList;
