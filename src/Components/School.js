import React from "react";
import "../style/School.css";
import { Route } from "react-router-dom";
import SchoolList from "./SchoolList";
import NewSchool from "./NewSchool";

export default function School(props) {
  const { username } = props;
  return (
    <div className="school">
      <Route
        path={`/${username}/school`}
        exact
        render={() => <SchoolList {...props} />}
      />
      <Route
        path={`/${username}/school/new`}
        render={() => <NewSchool {...props} />}
      />
    </div>
  );
}
