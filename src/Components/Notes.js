import React from "react";
import { Link } from "react-router-dom";
import BookOutlined from "@material-ui/icons/BookOutlined";
import SummaryBox from "./SummaryBox";

export default function Notes(props) {
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
            <BookOutlined />
            New
          </Link>
        ) : (
          ""
        )}
      </div>
      <div className="no-courses">
        <div className="no-note-logo no-logo"></div>
        <h2>This school don't have any course yet.</h2>
        <div className="newBtn">
          <Link className="new-school" to={`notes/new`}>
            <BookOutlined />
            New Note
          </Link>

          <a href="/learn-more">Learn more</a>
        </div>
      </div>
    </div>
  );
}
