import React from "react";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SummaryBox from "./SummaryBox";

export default function Videos(props) {
  const { isMySchool, schoolId } = props;

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
            <PlayCircleOutlineIcon />
            New
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="no-courses">
        <div className="no-video-logo no-logo"></div>
        <h2>This school don't have any course yet.</h2>
        <div className="newBtn">
          <Link className="new-school" to={`notes/new`}>
            <PlayCircleOutlineIcon />
            New Video
          </Link>

          <a href="/learn-more">Learn more</a>
        </div>
      </div>
    </div>
  );
}
