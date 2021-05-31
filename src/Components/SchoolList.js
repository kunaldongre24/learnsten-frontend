import React from "react";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";

function SchoolList(props) {
  const { isMyProfile, username } = props;
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
    </div>
  );
}

export default SchoolList;
