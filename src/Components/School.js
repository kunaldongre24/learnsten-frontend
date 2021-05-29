import React from "react";
import "../style/School.css";
import SummaryBox from "./SummaryBox";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";

export default function School() {
  return (
    <div className="school">
      <div>
        <div className="school-header">
          <input
            type="text"
            className="find-school"
            placeholder="Find a school..."
          />
          <SummaryBox text="Type" modalHeader="something" />
          <SummaryBox text="Subject" modalHeader="something" />
          <SummaryBox text="Sort" modalHeader="something" />
          <button className="new-school">New</button>
        </div>
      </div>
    </div>
  );
}
