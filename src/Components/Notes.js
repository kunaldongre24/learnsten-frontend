import React from "react";
import { Link } from "react-router-dom";
import BookOutlined from "@material-ui/icons/BookOutlined";
import SummaryBox from "./SummaryBox";
import NoContent from "./NoContent";

export default function Notes(props) {
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
          <Link className="new-school" to={`/no`}>
            <BookOutlined />
            New
          </Link>
        ) : (
          ""
        )}
      </div>
      <NoContent
        msg={
          isMyProfile
            ? "You don't have any note yet."
            : `${username} doesn't have any note yet.`
        }
        myProfile={isMyProfile}
        buttonText="New Note"
        btnLink="/new/note"
        Icon={BookOutlined}
        logoClass="no-note-logo"
      />
    </div>
  );
}
